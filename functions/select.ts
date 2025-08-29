import type {SelectOption} from "~/types/common";
import {ACTION_TYPE, GENDER, LANGUAGE} from "~/types/enums";
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