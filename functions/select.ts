import type {SelectOption} from "~/types/common";
import {
    ACTION_ASSESSMENT_CENTER_RESULT,
    ACTION_INTERVIEW_RESULT, ACTION_TASK_RESULT,
    ACTION_TYPE,
    GENDER,
    LANGUAGE,
    OFFER_STATE
} from "~/types/enums";
import {getEnumValues} from "~/functions/common";

export function getLanguageOptions(): SelectOption[] {
    return getEnumValues(LANGUAGE).map(language => ({
        value: language,
        label: `common.language.${language}`,
        translate: true
    }))
}

export function getGenderOptions(): SelectOption[] {
    return getEnumValues(GENDER).map(gender => ({
        value: gender,
        label: `common.gender.${gender}`,
        translate: true
    }))
}

export function getActionOptions(): SelectOption[] {
    return getEnumValues(ACTION_TYPE).map(action => ({
        value: action,
        label: `model.positionCandidateAction.types.${action}`,
        translate: true
    }))
}

export function getInterviewResultOptions(): SelectOption[] {
    return getEnumValues(ACTION_INTERVIEW_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.interviewResults.${result}`,
        translate: true
    }))
}

export function getAssessmentCenterResultOptions(): SelectOption[] {
    return getEnumValues(ACTION_ASSESSMENT_CENTER_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.assessmentCenterResults.${result}`,
        translate: true
    }))
}

export function getOfferStateOptions(): SelectOption[] {
    return getEnumValues(OFFER_STATE).map(state => ({
        value: state,
        label: `model.positionCandidateAction.offerStates.${state}`,
        translate: true
    }))
}

export function getTaskResultOptions(): SelectOption[] {
    return getEnumValues(ACTION_TASK_RESULT).map(result => ({
        value: result,
        label: `model.positionCandidateAction.taskResults.${result}`,
        translate: true
    }))
}