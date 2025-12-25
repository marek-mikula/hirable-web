import {Repository} from "~/repositories/Repository";
import type {SearchResponse} from "~/repositories/search/responses";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";
import type {ROLE, POSITION_ROLE, POSITION_STATE} from "~/types/enums";

export class SearchRepository extends Repository implements SearchRepositoryInterface {
    public async companyUsers(q: string | null, ignoreAuth?: boolean, roles?: ROLE[]) {
        const query: Record<string, string|null> = { q }

        if (ignoreAuth !== undefined) {
            query['ignoreAuth'] = ignoreAuth ? '1' : '0'
        }

        if (roles !== undefined) {
            for (const [index, role] of roles.entries()) {
                query[`roles[${index}]`] = role
            }
        }

        return this.client.get<'json', SearchResponse>('/api/search/company-users', {
            query
        })
    }

    public async companyContacts(q: string | null) {
        return this.client.get<'json', SearchResponse>('/api/search/company-contacts', {
            query: {
                q,
            }
        })
    }

    public async positionUsers(positionId:number, q: string | null, ignoreAuth?: boolean, roles?: POSITION_ROLE[]) {
        const query: Record<string, string|null> = { q }

        if (ignoreAuth !== undefined) {
            query['ignoreAuth'] = ignoreAuth ? '1' : '0'
        }

        if (roles !== undefined) {
            for (const [index, role] of roles.entries()) {
                query[`roles[${index}]`] = role
            }
        }

        return this.client.get<'json', SearchResponse>(`/api/search/positions/${positionId}/users`, {
            query
        })
    }

    public async editablePositions(q: string | null, states?: POSITION_STATE[]) {
        const query: Record<string, string|null> = { q }

        if (states !== undefined) {
            for (const [index, state] of states.entries()) {
                query[`states[${index}]`] = state
            }
        }

        return this.client.get<'json', SearchResponse>('/api/search/editable-positions', {
            query
        })
    }
}
