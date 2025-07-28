import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {
    DeleteResponse,
    DuplicateResponse,
    IndexResponse,
    KanbanResponse,
    ShowResponse,
    StoreResponse,
    KanbanUpdateSettingsResponse,
    UpdateResponse,
    CancelApprovalResponse
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.get<'json', IndexResponse>('/api/positions', { query: gridQuery })
    }

    public async store(data: FormData) {
        return this.post<'json', StoreResponse>('/api/positions', { data })
    }

    public async update(id: number, data: FormData) {
        return this.patch<'json', UpdateResponse>(`/api/positions/${id}`, { data })
    }

    public async show(id: number) {
        return this.get<'json', ShowResponse>(`/api/positions/${id}`)
    }

    public async deletePosition(id: number) {
        return this.delete<'json', DeleteResponse>(`/api/positions/${id}`)
    }

    public async duplicate(id: number) {
        return this.post<'json', DuplicateResponse>(`/api/positions/${id}/duplicate`)
    }

    public async cancelApproval(id: number) {
        return this.patch<'json', CancelApprovalResponse>(`/api/positions/${id}/cancel-approval`)
    }

    public async kanban(id: number) {
        return this.get<'json', KanbanResponse>(`/api/positions/${id}/kanban`)
    }

    public async updateKanbanSettings(id: number, data: FormData) {
        return this.patch<'json', KanbanUpdateSettingsResponse>(`/api/positions/${id}/kanban/settings`, {data})
    }
}