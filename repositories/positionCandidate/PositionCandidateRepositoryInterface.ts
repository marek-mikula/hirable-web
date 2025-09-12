import type {Response} from "~/types/request";
import type {IndexResponse, SetStepResponse, SetPriorityResponse, ShowResponse} from "~/repositories/positionCandidate/responses";
import type {POSITION_CANDIDATE_PRIORITY} from "~/types/enums";

export interface PositionCandidateRepositoryInterface {
    index(positionId: number): Promise<Response<'json', IndexResponse>>
    show(positionId: number, id: number): Promise<Response<'json', ShowResponse>>
    setStep(positionId: number, id: number, positionProcessStepId: number): Promise<Response<'json', SetStepResponse>>
    setPriority(positionId: number, id: number, priority: POSITION_CANDIDATE_PRIORITY | null): Promise<Response<'json', SetPriorityResponse>>
}