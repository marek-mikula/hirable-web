import {Repository} from "~/repositories/Repository";
import type {SearchResponse} from "~/repositories/search/responses";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";

export class SearchRepository extends Repository implements SearchRepositoryInterface {
    public companyUsers(q: string | null, ignoreAuth?: boolean) {
        return this.get<SearchResponse>('/api/search/company-users', {
            query: {
                q,
                ignoreAuth: ignoreAuth !== undefined ? (ignoreAuth ? '1' : '0') : undefined
            }
        })
    }

    public companyContacts(q: string | null) {
        return this.get<SearchResponse>('/api/search/company-contacts', {
            query: {
                q,
            }
        })
    }
}