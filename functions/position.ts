import type {AuthUser, Position} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import type {RouteLocationRaw} from "vue-router";
import type {FormButton} from "~/types/components/position/form.types";

export function getRouteByPosition(position: Position): RouteLocationRaw {
    if (position.state === POSITION_STATE.DRAFT) {
        return `/positions/${position.id}/edit`
    }

    return `/positions/${position.id}`
}

export function getFormButtons(position: Position | null, user: AuthUser): FormButton[] {
    if (! position) {
        return ['save', 'open', 'sendForApproval']
    }

    if (position.state !== POSITION_STATE.DRAFT) {
        throw new Error('Cannot get form buttons for position in other state than draft')
    }

    if (position.approvalState === null) {
        if (position.userId === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.approvalState === POSITION_APPROVAL_STATE.PENDING) {
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

    if ([POSITION_APPROVAL_STATE.REJECTED, POSITION_APPROVAL_STATE.CANCELED, POSITION_APPROVAL_STATE.EXPIRED].includes(position.approvalState)) {
        if (position.userId === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.approvalState === POSITION_APPROVAL_STATE.APPROVED) {
        if (position.userId === user.id) {
            return ['save', 'open']
        }

        return []
    }

    return []
}