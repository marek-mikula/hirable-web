import type {Response} from "~/types/request";
import type {StoreData, UpdateData} from "~/repositories/positionProcessStep/inputs";
import type {DeleteResponse, UpdateResponse, StoreResponse} from "~/repositories/positionProcessStep/responses";

export interface PositionProcessStepRepositoryInterface {
    store(positionId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    update(positionId: number, id: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
    deletePositionProcessStep(positionId: number, id: number): Promise<Response<'json', DeleteResponse>>
}