import type {Response} from "~/types/request";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {StoreResponse} from "~/repositories/processStep/responses";

export interface ProcessStepRepositoryInterface {
    store(data: StoreData): Promise<Response<'json', StoreResponse>>
}