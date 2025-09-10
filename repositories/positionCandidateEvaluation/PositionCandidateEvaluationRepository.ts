import {Repository} from "~/repositories/Repository";
import type {
    DeleteResponse,
    IndexResponse,
    StoreResponse,
    RequestResponse,
    UpdateResponse
} from "~/repositories/positionCandidateEvaluation/responses";
import type {StoreData, RequestData, UpdateData} from "~/repositories/positionCandidateEvaluation/inputs";
import type {PositionCandidateEvaluationRepositoryInterface} from "~/repositories/positionCandidateEvaluation/PositionCandidateEvaluationRepositoryInterface";

export class PositionCandidateEvaluationRepository extends Repository implements PositionCandidateEvaluationRepositoryInterface {
    public async index(positionId: number, positionCandidateId: number) {
        return this.client.get<'json', IndexResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations`)
    }

    public async store(positionId: number, positionCandidateId: number, data: StoreData) {
        return this.client.post<'json', StoreResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations`, {
            data
        })
    }

    public async requestEvaluation(positionId: number, positionCandidateId: number, data: RequestData) {
        return this.client.post<'json', RequestResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations/request`, {
            data
        })
    }

    public async update(positionId: number, positionCandidateId: number, id: number, data: UpdateData) {
        return this.client.patch<'json', UpdateResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations/${id}`, {
            data
        })
    }

    public async delete(positionId: number, positionCandidateId: number, id: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/positions/${positionId}/candidates/${positionCandidateId}/evaluations/${id}`)
    }
}