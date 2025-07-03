import type {SearchResponse} from "~/repositories/search/responses";
import type {Response} from "~/types/request";
import type {ROLE} from "~/types/enums";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null, ignoreAuth?: boolean, roles?: ROLE[]): Promise<Response<'json', SearchResponse>>
    companyContacts(q: string | null): Promise<Response<'json', SearchResponse>>
}