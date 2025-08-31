import type {Response} from "~/types/request";
import type {SetStepResponse, ShowResponse} from "~/repositories/positionCandidate/responses";

export interface PositionCandidateRepositoryInterface {
    show(positionId: number, id: number): Promise<Response<'json', ShowResponse>>
    setStep(positionId: number, id: number, positionProcessStepId: number): Promise<Response<'json', SetStepResponse>>
}