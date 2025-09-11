import {Repository} from "~/repositories/Repository";
import type {PositionCandidateShareRepositoryInterface} from "~/repositories/positionCandidateShare/PositionCandidateShareRepositoryInterface";
import type {DeleteResponse, IndexResponse, StoreResponse} from "~/repositories/positionCandidateShare/responses";
import type {StoreData} from "~/repositories/positionCandidateShare/inputs";

export class PositionCandidateShareRepository extends Repository implements PositionCandidateShareRepositoryInterface {
    public async index(positionId: number, positionCandidateId: number) {
        return this.client.get<'json', IndexResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/shares`)
    }

    public async store(positionId: number, positionCandidateId: number, data: StoreData) {
        return this.client.post<'json', StoreResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/shares`, {
            data
        })
    }

    public async delete(positionId: number, positionCandidateId: number, id: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/shares/${id}`)
    }
}