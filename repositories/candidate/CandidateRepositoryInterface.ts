import type {Response} from "~/types/request";
import type {IndexResponse} from "~/repositories/candidate/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CandidateRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
}