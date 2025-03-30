import {Repository} from "~/repositories/Repository";
import type {SearchResponse} from "~/repositories/search/response";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";

export class SearchRepository extends Repository implements SearchRepositoryInterface {
    public companyUsers(q: string | null) {
        return this.get<SearchResponse>('/api/search/company-users', {
            query: {
                q,
            }
        })
    }
}