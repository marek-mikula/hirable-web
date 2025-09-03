import type {Response} from "~/types/request";
import type {ActionStoreData, ActionUpdateData} from "~/repositories/positionCandidateAction/inputs";
import type {ShowResponse, StoreResponse, UpdateResponse} from "~/repositories/positionCandidateAction/responses";

export interface PositionCandidateActionRepositoryInterface {
    store(positionId: number, positionCandidateId: number, data: ActionStoreData): Promise<Response<'json', StoreResponse>>
    update(positionId: number, positionCandidateId: number, id: number, data: ActionUpdateData): Promise<Response<'json', UpdateResponse>>
    show(positionId: number, positionCandidateId: number, id: number): Promise<Response<'json', ShowResponse>>
}