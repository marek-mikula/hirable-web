import type {SelectSearcher} from "~/types/common";
import type {ROLE} from "~/types/enums";

export function createCompanyUsersSearcher(ignoreAuth?: boolean, roles?: ROLE[]): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyUsers(q, ignoreAuth, roles).then(res => res._data!.data.results)
}

export function createCompanyContactsSearcher(): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyContacts(q).then(res => res._data!.data.results)
}