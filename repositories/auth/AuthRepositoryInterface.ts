import type {
    LoginData,
} from "~/repositories/auth/inputs";
import type {
    LoginResponse,
    LogoutResponse,
    MeResponse,
} from "~/repositories/auth/responses";
import type {
    Response
} from "~/types/request";

export interface AuthRepositoryInterface {
    login(data: LoginData): Response<LoginResponse, 'json'>
    logout(): Response<LogoutResponse, 'json'>
    me(): Response<MeResponse, 'json'>
}