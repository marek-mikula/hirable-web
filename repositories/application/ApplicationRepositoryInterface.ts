import type {Response} from "~/types/request";
import type {TokenInfoResponse} from "~/repositories/application/responses";

export interface ApplicationRepositoryInterface {
    tokenInfo(token: string): Promise<Response<'json', TokenInfoResponse>>
}