import type {InputSuggester} from "~/types/common";

export function createPositionDepartmentsSuggester(): InputSuggester {
    return (q: string | null) => useApi().positionSuggest.departments(q).then(response => response._data!.data.values)
}