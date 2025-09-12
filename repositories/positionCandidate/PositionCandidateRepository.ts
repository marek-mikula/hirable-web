import {Repository} from "~/repositories/Repository";
import type {PositionCandidateRepositoryInterface} from "~/repositories/positionCandidate/PositionCandidateRepositoryInterface";
import type {
    IndexResponse,
    SetPriorityResponse,
    SetStepResponse,
    ShowResponse
} from "~/repositories/positionCandidate/responses";
import type {POSITION_CANDIDATE_PRIORITY} from "~/types/enums";

export class PositionCandidateRepository extends Repository implements PositionCandidateRepositoryInterface {
    public async index(positionId: number) {
        return this.client.get<'json', IndexResponse>(`/api/positions/${positionId}/candidates`)
    }

    public async show(positionId: number, id: number) {
        return this.client.get<'json', ShowResponse>(`/api/positions/${positionId}/candidates/${id}`)
    }

    public async setStep(positionId: number, id: number, positionProcessStepId: number) {
        return this.client.patch<'json', SetStepResponse>(`/api/positions/${positionId}/candidates/${id}/set-step`, {
            data: {
                positionProcessStep: positionProcessStepId
            }
        })
    }

    public async setPriority(positionId: number, id: number, priority: POSITION_CANDIDATE_PRIORITY | null) {
        return this.client.patch<'json', SetPriorityResponse>(`/api/positions/${positionId}/candidates/${id}/set-priority`, {
            data: {
                priority
            }
        })
    }
}