import type {Response} from "~/types/request";
import type {IndexResponse} from "~/repositories/candidate/response";
import type {GridQueryString} from "~/types/grid";

export interface CandidateRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
}