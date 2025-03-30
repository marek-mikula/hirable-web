import type {
    RequestResetData,
    ResetData,
} from "~/repositories/password/input";
import type {
    RequestResetResponse,
    ResetResponse,
} from "~/repositories/password/response";
import type {Response} from "~/types/request";

export interface PasswordRepositoryInterface {
    requestReset(data: RequestResetData): Response<RequestResetResponse, 'json'>

    reset(token: string, data: ResetData): Response<ResetResponse, 'json'>
}