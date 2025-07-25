import type {Response} from "~/types/request";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {DeleteResponse, IndexResponse, StoreResponse} from "~/repositories/processStep/responses";

export interface ProcessStepRepositoryInterface {
    store(data: StoreData): Promise<Response<'json', StoreResponse>>
    index(): Promise<Response<'json', IndexResponse>>
    deleteProcessStep(id: number): Promise<Response<'json', DeleteResponse>>
}