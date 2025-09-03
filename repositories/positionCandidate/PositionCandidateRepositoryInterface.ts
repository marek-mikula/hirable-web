import type {Response} from "~/types/request";
import type {IndexResponse, SetStepResponse, ShowResponse} from "~/repositories/positionCandidate/responses";

export interface PositionCandidateRepositoryInterface {
    index(positionId: number): Promise<Response<'json', IndexResponse>>
    show(positionId: number, id: number): Promise<Response<'json', ShowResponse>>
    setStep(positionId: number, id: number, positionProcessStepId: number): Promise<Response<'json', SetStepResponse>>
}