import type {SelectSearcher} from "~/types/common";

export function createCompanyUsersSearcher(ignoreAuth?: boolean): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyUsers(q, ignoreAuth).then(res => res._data!.data.results)
}

export function createCompanyContactsSearcher(): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyContacts(q).then(res => res._data!.data.results)
}

export function createAdvertisementPositionsSearcher(): SelectSearcher {
    return async (q: string | null) => await useApi().search.advertisementPositions(q).then(res => res._data!.data.results)
}