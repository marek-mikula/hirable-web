import type {SearchResponse} from "~/repositories/search/responses";
import type {Response} from "~/types/request";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null, ignoreAuth?: boolean): Response<SearchResponse, 'json'>
    companyContacts(q: string | null): Response<SearchResponse, 'json'>
}