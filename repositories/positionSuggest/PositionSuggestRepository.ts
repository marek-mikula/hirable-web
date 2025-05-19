import {Repository} from "~/repositories/Repository";
import type {PositionSuggestRepositoryInterface} from "~/repositories/positionSuggest/PositionSuggestRepositoryInterface";
import type {SuggestResponse} from "~/repositories/positionSuggest/responses";

export class PositionSuggestRepository extends Repository implements PositionSuggestRepositoryInterface {
    public departments(q: string | null) {
        return this.get<SuggestResponse>('/api/positions/suggest/departments', {
            query: { q }
        })
    }

    public technologies(q: string | null) {
        return this.get<SuggestResponse>('/api/positions/suggest/technologies', {
            query: { q }
        })
    }

    public certificates(q: string | null) {
        return this.get<SuggestResponse>('/api/positions/suggest/certificates', {
            query: { q }
        })
    }
}