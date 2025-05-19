import type {Response} from "~/types/request";
import type {SuggestResponse} from "~/repositories/positionSuggest/responses";

export interface PositionSuggestRepositoryInterface {
    departments(q: string | null): Response<SuggestResponse, 'json'>
    technologies(q: string | null): Response<SuggestResponse, 'json'>
    certificates(q: string | null): Response<SuggestResponse, 'json'>
}