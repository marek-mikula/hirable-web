import {Repository} from "~/repositories/Repository";
import type {PositionCandidateRepositoryInterface} from "~/repositories/positionCandidate/PositionCandidateRepositoryInterface";
import type {SetStepResponse, ShowResponse} from "~/repositories/positionCandidate/responses";

export class PositionCandidateRepository extends Repository implements PositionCandidateRepositoryInterface {
    public async show(positionId: number, id: number) {
        return this.get<'json', ShowResponse>(`/api/positions/${positionId}/candidates/${id}`)
    }

    public async setStep(positionId: number, id: number, positionProcessStepId: number) {
        return this.patch<'json', SetStepResponse>(`/api/positions/${positionId}/candidates/${id}/set-step`, {
            data: {
                positionProcessStep: positionProcessStepId
            }
        })
    }
}