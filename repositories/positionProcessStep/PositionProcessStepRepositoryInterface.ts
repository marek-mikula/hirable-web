import type {Response} from "~/types/request";
import type {StoreData} from "~/repositories/positionProcessStep/inputs";
import type {StoreResponse} from "~/repositories/positionProcessStep/responses";

export interface PositionProcessStepRepositoryInterface {
    store(positionId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
}