import {Repository} from "~/repositories/Repository";
import type {PositionCandidateRepositoryInterface} from "~/repositories/positionCandidate/PositionCandidateRepositoryInterface";
import type {SetStepResponse} from "~/repositories/positionCandidate/responses";

export class PositionCandidateRepository extends Repository implements PositionCandidateRepositoryInterface {
    public async setStep(positionId: number, id: number, positionProcessStepId: number) {
        return this.patch<'json', SetStepResponse>(`/api/positions/${positionId}/candidates/${id}/set-step`, {
            data: {
                positionProcessStep: positionProcessStepId
            }
        })
    }
}