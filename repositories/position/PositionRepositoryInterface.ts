import type {Response} from "~/types/request";
import type {StoreResponse} from "~/repositories/position/responses";

export interface PositionRepositoryInterface {
    store(data: FormData): Response<StoreResponse, 'json'>
}