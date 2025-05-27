import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {IndexResponse, StoreResponse} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/positions', { query: gridQuery })
    }

    public store(data: FormData) {
        return this.post<StoreResponse>('/api/positions', { data })
    }
}