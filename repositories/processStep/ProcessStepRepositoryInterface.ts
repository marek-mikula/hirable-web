import type {Response} from "~/types/request";
import type {StoreData, UpdateData} from "~/repositories/processStep/inputs";
import type {DeleteResponse, IndexResponse, StoreResponse, UpdateResponse} from "~/repositories/processStep/responses";

export interface ProcessStepRepositoryInterface {
    index(): Promise<Response<'json', IndexResponse>>
    store(data: StoreData): Promise<Response<'json', StoreResponse>>
    update(id: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
    deleteProcessStep(id: number): Promise<Response<'json', DeleteResponse>>
}