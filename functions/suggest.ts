import type {InputSuggester} from "~/types/common";

export function createPositionDepartmentsSuggester(): InputSuggester {
    return (q: string | null) => useApi().positionSuggest.departments(q).then(response => response._data!.data.values)
}

export function createPositionTechnologiesSuggester(): InputSuggester {
    return (q: string | null) => useApi().positionSuggest.technologies(q).then(response => response._data!.data.values)
}

export function createPositionCertificatesSuggester(): InputSuggester {
    return (q: string | null) => useApi().positionSuggest.certificates(q).then(response => response._data!.data.values)
}