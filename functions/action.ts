import type {PositionCandidateAction, PositionProcessStep} from "~/repositories/resources";
import {ACTION_TYPE, CLASSIFIER_TYPE, PROCESS_STEP} from "~/types/enums";

export function getActionName(action: PositionCandidateAction): string {
    return action.type === ACTION_TYPE.CUSTOM ? String(action.name) : getI18n().t(`model.positionCandidateAction.types.${action.type}`)
}

export function getClassifiersForAction(type: ACTION_TYPE): CLASSIFIER_TYPE[] {
    if (type === ACTION_TYPE.INTERVIEW) {
        return [
            CLASSIFIER_TYPE.INTERVIEW_TYPE,
            CLASSIFIER_TYPE.INTERVIEW_FORM,
        ]
    } else if (type === ACTION_TYPE.TASK) {
        return [
            CLASSIFIER_TYPE.TASK_TYPE,
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

export function isActionAllowedInStep(type: ACTION_TYPE, {step}: PositionProcessStep): boolean {
    if (step === PROCESS_STEP.OFFER) {
        return type === ACTION_TYPE.OFFER
    } else if (step === PROCESS_STEP.PLACEMENT) {
        return type === ACTION_TYPE.START_OF_WORK
    } else if (step === PROCESS_STEP.REJECTED) {
        return type === ACTION_TYPE.REJECTION
    }

    return ![
        ACTION_TYPE.OFFER,
        ACTION_TYPE.START_OF_WORK,
        ACTION_TYPE.REJECTION,
    ].includes(type)
}

export function isActionTriggerable(type: ACTION_TYPE): boolean {
    return ![
        ACTION_TYPE.OFFER,
        ACTION_TYPE.START_OF_WORK,
        ACTION_TYPE.REJECTION,
    ].includes(type)
}
