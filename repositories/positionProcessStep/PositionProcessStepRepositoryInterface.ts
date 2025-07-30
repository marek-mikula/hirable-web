import type {Response} from "~/types/request";
import type {StoreData} from "~/repositories/positionProcessStep/inputs";
import type {DeleteResponse, StoreResponse} from "~/repositories/positionProcessStep/responses";

export interface PositionProcessStepRepositoryInterface {
    store(positionId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    deletePositionProcessStep(positionId: number, id: number): Promise<Response<'json', DeleteResponse>>
}