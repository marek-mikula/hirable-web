import type {SelectSearcher} from "~/types/common";

export function createCompanyUsersSearcher(): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyUsers(q).then(res => res._data!.data.results)
}