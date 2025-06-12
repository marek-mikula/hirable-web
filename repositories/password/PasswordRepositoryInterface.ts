import type {
    RequestResetData,
    ResetData,
} from "~/repositories/password/inputs";
import type {
    RequestResetResponse,
    ResetResponse,
} from "~/repositories/password/responses";
import type {Response} from "~/types/request";

export interface PasswordRepositoryInterface {
    requestReset(data: RequestResetData): Promise<Response<'json', RequestResetResponse>>
    reset(token: string, data: ResetData): Promise<Response<'json', ResetResponse>>
}