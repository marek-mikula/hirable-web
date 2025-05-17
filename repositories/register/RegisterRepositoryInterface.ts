import type {
    RequestData,
    RegisterData,
} from "~/repositories/register/inputs";
import type {
    RequestResponse,
    RegisterResponse,
} from "~/repositories/register/responses";
import type {Response} from "~/types/request";

export interface RegisterRepositoryInterface {
    requestRegistration(data: RequestData): Response<RequestResponse, 'json'>

    register(token: string, data: RegisterData): Response<RegisterResponse, 'json'>
}