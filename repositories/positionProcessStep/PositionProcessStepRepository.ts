import {Repository} from "~/repositories/Repository";
import type {UpdateData, StoreData} from "~/repositories/positionProcessStep/inputs";
import type {
    StoreResponse,
    DeleteResponse,
    UpdateResponse,
    IndexResponse
} from "~/repositories/positionProcessStep/responses";
import type {PositionProcessStepRepositoryInterface} from "~/repositories/positionProcessStep/PositionProcessStepRepositoryInterface";

export class PositionProcessStepRepository extends Repository implements PositionProcessStepRepositoryInterface {
    public async index(positionId: number) {
        return this.get<'json', IndexResponse>(`/api/positions/${positionId}/process-steps`)
    }

    public async store(positionId: number, data: StoreData) {
        return this.post<'json', StoreResponse>(`/api/positions/${positionId}/process-steps`, {data})
    }

    public async update(positionId: number, id: number, data: UpdateData) {
        return this.patch<'json', UpdateResponse>(`/api/positions/${positionId}/process-steps/${id}`, {data})
    }

    public async deletePositionProcessStep(positionId: number, id: number) {
        return this.delete<'json', DeleteResponse>(`/api/positions/${positionId}/process-steps/${id}`)
    }
}