import type {Response} from "~/types/request";
import type {IndexResponse, StoreResponse} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface PositionRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    store(data: FormData): Response<StoreResponse, 'json'>
}