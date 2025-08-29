import type {AuthUser, PositionShow, PositionSalary} from "~/repositories/resources";
import {POSITION_APPROVAL_STATE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";
import type {FormButton} from "~/types/components/position/form.types";
import {formatNumberToK} from "~/functions/common";

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

export function isApproverInState(user: AuthUser, position: PositionShow, state: POSITION_APPROVAL_STATE): boolean {
    return position.approvals.some(approval => {
        return approval.state === state &&
            approval.role === POSITION_ROLE.APPROVER &&
            approval.model.id === user.id
    })
}

export function getFormButtons(position: PositionShow | null, user: AuthUser): FormButton[] {
    if (!position) {
        return ['save', 'open', 'sendForApproval']

    }

    if (position.state === POSITION_STATE.DRAFT) {
        if (position.user.id === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.state === POSITION_STATE.APPROVAL_PENDING) {
        if (position.user.id === user.id) {
            return ['cancelApproval']
        }

        return []
    }

    if ([
        POSITION_STATE.APPROVAL_REJECTED,
        POSITION_STATE.APPROVAL_CANCELED,
        POSITION_STATE.APPROVAL_EXPIRED,
    ].includes(position.state)) {
        if (position.user.id === user.id) {
            return ['save', 'open', 'sendForApproval']
        }

        return []
    }

    if (position.state === POSITION_STATE.APPROVAL_APPROVED) {
        if (position.user.id === user.id) {
            return ['open']
        }

        return []
    }

    throw new Error(`Cannot get form buttons for state ${position.state}!`)
}

export function formatSalary(salary: PositionSalary): string {
    let result = formatNumberToK(salary.from)

    if (salary.to) {
        result = `${result} - ${formatNumberToK(salary.to)}`
    }

    result = `${result} ${salary.currency.label} / ${salary.frequency.label} (${salary.type.label})`

    if (salary.var) {
        result = `${result} + ${salary.var}`
    }

    return result
}