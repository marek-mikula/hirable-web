import type {SelectOption} from "~/types/common";
import {
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

export function getOfferStateOptions(): SelectOption<OFFER_STATE>[] {
    return getEnumValues(OFFER_STATE).map(state => ({
        value: state,
        label: `model.positionCandidateAction.offerStates.${state}`,
        translate: true
    }))
}

export function getStarsOptions(): SelectOption<number>[] {
    return [1, 2, 3, 4, 5].map(star => ({
        value: star,
        label: star + ' ' + '⭐'.repeat(star),
    }))
}
