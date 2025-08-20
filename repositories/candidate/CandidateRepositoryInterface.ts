import type {Response} from "~/types/request";
import type {IndexResponse, ShowResponse, UpdateResponse} from "~/repositories/candidate/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CandidateRepositoryInterface {
    index(gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
    show(id: number): Promise<Response<'json', ShowResponse>>
    update(id: number, data: FormData): Promise<Response<'json', UpdateResponse>>
}