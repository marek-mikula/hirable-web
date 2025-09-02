import type {Response} from "~/types/request";
import type {ActionStoreData} from "~/repositories/positionCandidateAction/inputs";
import type {ShowResponse, StoreResponse} from "~/repositories/positionCandidateAction/responses";

export interface PositionCandidateActionRepositoryInterface {
    store(positionId: number, positionCandidateId: number, data: ActionStoreData): Promise<Response<'json', StoreResponse>>
    show(positionId: number, positionCandidateId: number, id: number): Promise<Response<'json', ShowResponse>>
}