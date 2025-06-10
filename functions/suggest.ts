import type {InputSuggester} from "~/types/components/form/suggestInput.types";

export function createPositionDepartmentsSuggester(): InputSuggester {
    return (q: string | null) => useApi().positionSuggest.departments(q).then(response => response._data!.data.values)
}

export function createCompanyContactCompaniesSuggester(companyId: number): InputSuggester {
    return (q: string | null) => useApi().companyContact.suggestCompanies(companyId, q).then(response => response._data!.data.values)
}