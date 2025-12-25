import type {SearchResponse} from "~/repositories/search/responses";
import type {Response} from "~/types/request";
import type {ROLE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null, ignoreAuth?: boolean, roles?: ROLE[]): Promise<Response<'json', SearchResponse>>
    companyContacts(q: string | null): Promise<Response<'json', SearchResponse>>
    positionUsers(positionId: number, q: string | null, ignoreAuth?: boolean, roles?: POSITION_ROLE[]): Promise<Response<'json', SearchResponse>>
    editablePositions(q: string | null, states?: POSITION_STATE[]): Promise<Response<'json', SearchResponse>>
}
