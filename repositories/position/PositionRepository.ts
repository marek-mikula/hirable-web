import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {
    DuplicateResponse,
    IndexResponse,
    ShowResponse,
    StoreResponse,
    UpdateResponse
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/positions', { query: gridQuery })
    }

    public async store(data: FormData) {
        return this.post<StoreResponse>('/api/positions', { data })
    }

    public async update(id: number, data: FormData) {
        return this.patch<UpdateResponse>(`/api/positions/${id}`, { data })
    }

    public async show(id: number) {
        return this.get<ShowResponse>(`/api/positions/${id}`)
    }

    public async duplicate(id: number) {
        return this.post<DuplicateResponse>(`/api/positions/${id}/duplicate`)
    }
}