import type {SearchResponse} from "~/repositories/search/responses";
import type {Response} from "~/types/request";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null, ignoreAuth?: boolean): Promise<Response<'json', SearchResponse>>
    companyContacts(q: string | null): Promise<Response<'json', SearchResponse>>
}