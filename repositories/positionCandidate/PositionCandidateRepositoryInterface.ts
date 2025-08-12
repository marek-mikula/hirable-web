import type {Response} from "~/types/request";
import type {SetStepResponse} from "~/repositories/positionCandidate/responses";

export interface PositionCandidateRepositoryInterface {
    setStep(positionId: number, id: number, positionProcessStepId: number): Promise<Response<'json', SetStepResponse>>
}