import type {SelectSearcher} from "~/types/common";
import type {ROLE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";

export function createCompanyUsersSearcher(ignoreAuth?: boolean, roles?: ROLE[]): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyUsers(q, ignoreAuth, roles).then(res => res._data!.data.results)
}

export function createCompanyContactsSearcher(): SelectSearcher {
    return async (q: string | null) => await useApi().search.companyContacts(q).then(res => res._data!.data.results)
}

export function createPositionUsersSearcher(positionId: number, ignoreAuth?: boolean, roles?: POSITION_ROLE[]): SelectSearcher {
    return async (q: string | null) => await useApi().search.positionUsers(positionId, q, ignoreAuth, roles).then(res => res._data!.data.results)
}

export function createEditablePositionsSearcher(states?: POSITION_STATE[]): SelectSearcher {
    return async (q: string | null) => await useApi().search.editablePositions( q, states).then(res => res._data!.data.results)
}
