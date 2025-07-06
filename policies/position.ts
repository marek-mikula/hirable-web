import type {AuthUser, Position} from "~/repositories/resources";
import {POSITION_STATE} from "~/types/enums";

export const canDeletePosition = (user: AuthUser, position: Position): boolean => {
    return user.companyId === position.companyId && user.id === position.userId && ![
        POSITION_STATE.OPENED,
        POSITION_STATE.CLOSED,
        POSITION_STATE.CANCELED,
    ].includes(position.state);
}