import {Repository} from "~/repositories/Repository";
import type {SearchResponse} from "~/repositories/search/responses";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";
import type {ROLE} from "~/types/enums";
import type {StringMap} from "~/types/common";

export class SearchRepository extends Repository implements SearchRepositoryInterface {
    public async companyUsers(q: string | null, ignoreAuth?: boolean, roles?: ROLE[]) {
        const query: StringMap<string|null> = { q }

        if (ignoreAuth !== undefined) {
            query['ignoreAuth'] = ignoreAuth ? '1' : '0'
        }

        if (roles !== undefined) {
            for (const [index, role] of roles.entries()) {
                query[`roles[${index}]`] = role
            }
        }

        return this.get<'json', SearchResponse>('/api/search/company-users', {
            query
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