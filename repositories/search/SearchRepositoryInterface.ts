import type {SearchResponse} from "~/repositories/search/response";
import type {Response} from "~/types/request";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null): Response<SearchResponse, 'json'>
}