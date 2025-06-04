import type {AuthUser, Position} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import type {RouteLocationRaw} from "vue-router";
import type {FormButton} from "~/types/components/position/form.types";

export function canPositionSeeForm(position: Position): boolean {
    return [
        POSITION_STATE.DRAFT,
        POSITION_STATE.APPROVAL_PENDING,
        POSITION_STATE.APPROVAL_APPROVED,
        POSITION_STATE.APPROVAL_REJECTED,
        POSITION_STATE.APPROVAL_CANCELED,
        POSITION_STATE.APPROVAL_EXPIRED,
    ].includes(position.state)
}

export function getRouteByPosition(position: Position): RouteLocationRaw {
    if (canPositionSeeForm(position)) {
        return `/positions/${position.id}/edit`
    }

    return `/positions/${position.id}`
}

export function getFormButtons(position: Position | null, user: AuthUser): FormButton[] {
    if (!position) {
        return ['save', 'open', 'sendForApproval']

    }

    if (position.state === POSITION_STATE.DRAFT) {
        if (position.userId === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.state === POSITION_STATE.APPROVAL_PENDING) {
        if (position.userId === user.id) {
            return ['cancelApproval']
        }

        const isApprover = position.approvals.some(approval => {
            return approval.state === POSITION_APPROVAL_STATE.PENDING &&
                [POSITION_ROLE.APPROVER, POSITION_ROLE.HIRING_MANAGER].includes(approval.role) &&
                approval.model.id === user.id
        })

        if (isApprover) {
            return ['approve', 'reject']
        }

        return []
    }

    if ([
        POSITION_STATE.APPROVAL_REJECTED,
        POSITION_STATE.APPROVAL_CANCELED,
        POSITION_STATE.APPROVAL_EXPIRED,
    ].includes(position.state)) {
        if (position.userId === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.state === POSITION_STATE.APPROVAL_APPROVED) {
        if (position.userId === user.id) {
            return ['open']
        }

        return []
    }

    throw new Error(`Cannot get form buttons for state ${position.state}!`)
}