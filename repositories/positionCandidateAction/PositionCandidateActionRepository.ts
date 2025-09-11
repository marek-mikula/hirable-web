import {Repository} from "~/repositories/Repository";
import type {PositionCandidateActionRepositoryInterface} from "~/repositories/positionCandidateAction/PositionCandidateActionRepositoryInterface";
import type {ActionStoreData, ActionUpdateData} from "~/repositories/positionCandidateAction/inputs";
import type {ShowResponse, StoreResponse, UpdateResponse} from "~/repositories/positionCandidateAction/responses";

export class PositionCandidateActionRepository extends Repository implements PositionCandidateActionRepositoryInterface {
    public async store(positionId: number, positionCandidateId: number, data: ActionStoreData) {
        return this.client.post<'json', StoreResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/actions`, {
            data
        })
    }

    public async update(positionId: number, positionCandidateId: number, id: number, data: ActionUpdateData) {
        return this.client.patch<'json', UpdateResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/actions/${id}`, {
            data
        })
    }

    public async show(positionId: number, positionCandidateId: number, id: number) {
        return this.client.get<'json', ShowResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/actions/${id}`)
    }
}