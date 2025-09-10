import type {Response} from "~/types/request";
import type {SetOrderData, StoreData, UpdateData} from "~/repositories/positionProcessStep/inputs";
import type {
    DeleteResponse,
    UpdateResponse,
    StoreResponse,
    IndexResponse,
    SetOrderResponse
} from "~/repositories/positionProcessStep/responses";

export interface PositionProcessStepRepositoryInterface {
    index(positionId: number): Promise<Response<'json', IndexResponse>>
    store(positionId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    update(positionId: number, id: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
    delete(positionId: number, id: number): Promise<Response<'json', DeleteResponse>>
    setOrder(positionId: number, data: SetOrderData): Promise<Response<'json', SetOrderResponse>>
}