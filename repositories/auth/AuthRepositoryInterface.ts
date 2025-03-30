import type {
    LoginData,
    UpdateData,
} from "~/repositories/auth/input";
import type {
    LoginResponse,
    LogoutResponse,
    MeResponse,
    UpdateResponse,
} from "~/repositories/auth/response";
import type {
    Response
} from "~/types/request";

export interface AuthRepositoryInterface {
    login(data: LoginData): Response<LoginResponse, 'json'>

    logout(): Response<LogoutResponse, 'json'>

    me(): Response<MeResponse, 'json'>

    update(data: UpdateData): Response<UpdateResponse, 'json'>
}