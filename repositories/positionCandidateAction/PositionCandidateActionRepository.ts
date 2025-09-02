import {Repository} from "~/repositories/Repository";
import type {PositionCandidateActionRepositoryInterface} from "~/repositories/positionCandidateAction/PositionCandidateActionRepositoryInterface";
import type {ActionStoreData} from "~/repositories/positionCandidateAction/inputs";
import type {StoreResponse} from "~/repositories/positionCandidateAction/responses";

export class PositionCandidateActionRepository extends Repository implements PositionCandidateActionRepositoryInterface {
    public async store(positionId: number, positionCandidateId: number, data: ActionStoreData) {
        return this.post<'json', StoreResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/actions`, {
            data
        })
    }
}