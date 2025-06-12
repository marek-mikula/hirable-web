import {Repository} from "~/repositories/Repository";
import type {SearchResponse} from "~/repositories/search/responses";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";

export class SearchRepository extends Repository implements SearchRepositoryInterface {
    public async companyUsers(q: string | null, ignoreAuth?: boolean) {
        return this.get<'json', SearchResponse>('/api/search/company-users', {
            query: {
                q,
                ignoreAuth: ignoreAuth !== undefined ? (ignoreAuth ? '1' : '0') : undefined
            }
        })
    }

    public async companyContacts(q: string | null) {
        return this.get<'json', SearchResponse>('/api/search/company-contacts', {
            query: {
                q,
            }
        })
    }
}