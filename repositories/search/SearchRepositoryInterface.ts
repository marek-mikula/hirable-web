import type {SearchResponse} from "~/repositories/search/responses";
import type {Response} from "~/types/request";

export interface SearchRepositoryInterface {
    companyUsers(q: string | null): Response<SearchResponse, 'json'>
}