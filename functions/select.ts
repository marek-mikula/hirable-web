import type {SelectOption} from "~/types/common";
import {
    ACTION_ASSESSMENT_CENTER_RESULT,
    ACTION_INTERVIEW_RESULT,
    ACTION_TASK_RESULT,
    ACTION_TYPE,
    GENDER,
    LANGUAGE,
    OFFER_STATE
} from "~/types/enums";
import {getEnumValues} from "~/functions/common";
import {isActionTriggerable} from "~/functions/action";

export function getLanguageOptions(): SelectOption<LANGUAGE>[] {
    return getEnumValues(LANGUAGE).map(language => ({
        value: language,
        label: `common.language.${language}`,
        translate: true
    }))
}

export function getGenderOptions(): SelectOption<GENDER>[] {
    return getEnumValues(GENDER).map(gender => ({
        value: gender,
        label: `common.gender.${gender}`,
        translate: true
    }))
}

export function getActionOptions(): SelectOption<ACTION_TYPE>[] {
    return getEnumValues(ACTION_TYPE).map(action => ({
        value: action,
        label: `model.positionCandidateAction.types.${action}`,
        translate: true
    }))
}

export function getTriggerableActionOptions(): SelectOption<ACTION_TYPE>[] {
    return getActionOptions().filter(item => isActionTriggerable(item.value))
}

export function getInterviewResultOptions(): SelectOption<ACTION_INTERVIEW_RESULT>[] {
    return getEnumValues(ACTION_INTERVIEW_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.interviewResults.${result}`,
        translate: true
    }))
}

export function getAssessmentCenterResultOptions(): SelectOption<ACTION_ASSESSMENT_CENTER_RESULT>[] {
    return getEnumValues(ACTION_ASSESSMENT_CENTER_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.assessmentCenterResults.${result}`,
        translate: true
    }))
}

export function getOfferStateOptions(): SelectOption<OFFER_STATE>[] {
    return getEnumValues(OFFER_STATE).map(state => ({
        value: state,
        label: `model.positionCandidateAction.offerStates.${state}`,
        translate: true
    }))
}

export function getTaskResultOptions(): SelectOption<ACTION_TASK_RESULT>[] {
    return getEnumValues(ACTION_TASK_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.taskResults.${result}`,
        translate: true
    }))
}