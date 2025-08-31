import type {PositionCandidateAction} from "~/repositories/resources";
import {ACTION_TYPE} from "~/types/enums";

export function getActionName(action: PositionCandidateAction): string {
    return action.type === ACTION_TYPE.CUSTOM ? String(action.name) : getI18n().t(`model.positionCandidateAction.types.${action.type}`)
}