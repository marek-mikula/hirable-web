import {Repository} from "~/repositories/Repository";
import type {UpdateData, StoreData, SetOrderData} from "~/repositories/positionProcessStep/inputs";
import type {
    StoreResponse,
    DeleteResponse,
    UpdateResponse,
    IndexResponse,
    SetOrderResponse
} from "~/repositories/positionProcessStep/responses";
import type {PositionProcessStepRepositoryInterface} from "~/repositories/positionProcessStep/PositionProcessStepRepositoryInterface";

export class PositionProcessStepRepository extends Repository implements PositionProcessStepRepositoryInterface {
    public async index(positionId: number) {
        return this.client.get<'json', IndexResponse>(`/api/positions/${positionId}/process-steps`)
    }

    public async store(positionId: number, data: StoreData) {
        return this.client.post<'json', StoreResponse>(`/api/positions/${positionId}/process-steps`, {data})
    }

    public async update(positionId: number, id: number, data: UpdateData) {
        return this.client.patch<'json', UpdateResponse>(`/api/positions/${positionId}/process-steps/${id}`, {data})
    }

    public async delete(positionId: number, id: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/positions/${positionId}/process-steps/${id}`)
    }

    public async setOrder(positionId: number, data: SetOrderData) {
        return this.client.patch<'json', SetOrderResponse>(`/api/positions/${positionId}/process-steps/set-order`, {data})
    }
}