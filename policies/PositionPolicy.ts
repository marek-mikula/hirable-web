import type {Position} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE, POSITION_STATE, ROLE} from "~/types/enums";
import {getPositionFormStates, isApproverInState} from "~/functions/position";

export class PositionPolicy {
    public store(): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return [
            ROLE.ADMIN,
            ROLE.RECRUITER,
        ].includes(user.value!.companyRole)
    }

    public show(position: Position): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (user.value!.companyId !== position.companyId) {
            return false
        }

        // user is the owner
        if (user.value!.id === position.user.id) {
            return true
        }

        // user is hiring manager or recruiter on position
        // and position has been opened
        if (
            [
                POSITION_STATE.OPENED,
                POSITION_STATE.CLOSED,
                POSITION_STATE.CANCELED,
            ].includes(position.state) &&
            (
                position.hiringManagers.some(hm => hm.id === user.value!.id) ||
                position.recruiters.some(hm => hm.id === user.value!.id)
            )
        ) {
            return true
        }

        // user is approver in pending state
        // and position is in approval pending state
        if (
            position.state === POSITION_STATE.APPROVAL_PENDING &&
            isApproverInState(user.value!, position, POSITION_APPROVAL_STATE.PENDING)
        ) {
            return true
        }

        return false
    }

    public update(position: Position): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (user.value!.companyId !== position.companyId) {
            return false
        }

        if ([
            POSITION_STATE.APPROVAL_PENDING,
            POSITION_STATE.CLOSED,
            POSITION_STATE.CANCELED,
        ].includes(position.state)) {
            return false
        }

        // when opened, used needs to be the owner
        // or recruiter on position
        if (position.state === POSITION_STATE.OPENED) {
            return position.user.id === user.value!.id || position.recruiters.some(hm => hm.id === user.value!.id)
        }

        return position.user.id === user.value!.id
    }

    public duplicate(position: Position): boolean {
        return this.store() && this.show(position)
    }

    public delete(position: Position): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return user.value!.companyId === position.companyId && user.value!.id === position.user.id && ![
            POSITION_STATE.OPENED,
            POSITION_STATE.CLOSED,
            POSITION_STATE.CANCELED,
        ].includes(position.state);
    }

    public approve(position: Position): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (position.state !== POSITION_STATE.APPROVAL_PENDING) {
            return false
        }

        return isApproverInState(user.value!, position, POSITION_APPROVAL_STATE.PENDING)
    }

    public showForm(position: Position): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        if (!getPositionFormStates().includes(position.state)) {
            return false
        }

        return position.user.id === user.value!.id
    }
}
