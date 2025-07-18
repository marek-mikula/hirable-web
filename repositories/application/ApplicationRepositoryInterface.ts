import type {Response} from "~/types/request";
import type {ApplyResponse, TokenInfoResponse} from "~/repositories/application/responses";

export interface ApplicationRepositoryInterface {
    tokenInfo(token: string): Promise<Response<'json', TokenInfoResponse>>
    apply(token: string, data: FormData): Promise<Response<'json', ApplyResponse>>
}