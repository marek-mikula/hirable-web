import type {
    RequestData,
    RegisterData,
} from "~/repositories/register/input";
import type {
    RequestResponse,
    RegisterResponse,
} from "~/repositories/register/response";
import type {Response} from "~/types/request";

export interface RegisterRepositoryInterface {
    requestRegistration(data: RequestData): Response<RequestResponse, 'json'>

    register(token: string, data: RegisterData): Response<RegisterResponse, 'json'>
}