import type {PositionCandidateAction} from "~/repositories/resources";
import {ACTION_TYPE, CLASSIFIER_TYPE} from "~/types/enums";

export function getActionName(action: PositionCandidateAction): string {
    return action.type === ACTION_TYPE.CUSTOM ? String(action.name) : getI18n().t(`model.positionCandidateAction.types.${action.type}`)
}

export function getClassifiersForAction(type: ACTION_TYPE): CLASSIFIER_TYPE[] {
    if (type === ACTION_TYPE.INTERVIEW) {
        return [
            CLASSIFIER_TYPE.INTERVIEW_TYPE,
            CLASSIFIER_TYPE.INTERVIEW_FORM,
        ]
    } else if (type === ACTION_TYPE.TEST) {
        return [
            CLASSIFIER_TYPE.TEST_TYPE,
            CLASSIFIER_TYPE.INTERVIEW_FORM,
        ]
    } else if (type === ACTION_TYPE.REJECTION) {
        return [
            CLASSIFIER_TYPE.REFUSAL_REASON,
            CLASSIFIER_TYPE.REJECTION_REASON,
        ]
    } else if (type === ACTION_TYPE.OFFER) {
        return [
            CLASSIFIER_TYPE.EMPLOYMENT_FORM,
            CLASSIFIER_TYPE.CURRENCY,
            CLASSIFIER_TYPE.SALARY_FREQUENCY,
            CLASSIFIER_TYPE.WORKLOAD,
            CLASSIFIER_TYPE.EMPLOYMENT_RELATIONSHIP,
            CLASSIFIER_TYPE.EMPLOYMENT_DURATION,
        ]
    }

    return []
}