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
    login(data: LoginData): Promise<Response<'json', LoginResponse>>
    logout(): Promise<Response<'json', LogoutResponse>>
    me(): Promise<Response<'json', MeResponse>>
}