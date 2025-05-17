import type {
    LoginData,
    UpdateData,
} from "~/repositories/auth/inputs";
import type {
    LoginResponse,
    LogoutResponse,
    MeResponse,
    UpdateResponse,
} from "~/repositories/auth/responses";
import type {
    Response
} from "~/types/request";

export interface AuthRepositoryInterface {
    login(data: LoginData): Response<LoginResponse, 'json'>

    logout(): Response<LogoutResponse, 'json'>

    me(): Response<MeResponse, 'json'>

    update(data: UpdateData): Response<UpdateResponse, 'json'>
}