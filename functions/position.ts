import type {AuthUser, Position} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import type {FormButton} from "~/types/components/position/form.types";

export function getPositionFormStates(): POSITION_STATE[] {
    return [
        POSITION_STATE.DRAFT,
        POSITION_STATE.APPROVAL_PENDING,
        POSITION_STATE.APPROVAL_APPROVED,
        POSITION_STATE.APPROVAL_REJECTED,
        POSITION_STATE.APPROVAL_CANCELED,
        POSITION_STATE.APPROVAL_EXPIRED,
    ]
}

export function isApproverInState(user: AuthUser, position: Position, state: POSITION_APPROVAL_STATE): boolean {
    return position.approvals.some(approval => {
        return approval.state === state &&
            approval.role === POSITION_ROLE.APPROVER &&
            approval.model.id === user.id
    })
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