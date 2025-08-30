import type {Response} from "~/types/request";
import type {ActionData} from "~/repositories/positionCandidateAction/inputs";
import type {StoreResponse} from "~/repositories/positionCandidateAction/responses";

export interface PositionCandidateActionRepositoryInterface {
    store(positionId: number, positionCandidateId: number, data: ActionData): Promise<Response<'json', StoreResponse>>
}