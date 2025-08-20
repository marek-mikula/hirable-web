import type {SelectOption} from "~/types/common";
import {GENDER, LANGUAGE} from "~/types/enums";
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