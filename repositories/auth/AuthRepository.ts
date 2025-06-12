import {Repository} from "~/repositories/Repository";
import type {
    LoginData,
} from "~/repositories/auth/inputs";
import type {
    LoginResponse,
    LogoutResponse,
    MeResponse,
} from "~/repositories/auth/responses";
import type {AuthRepositoryInterface} from "~/repositories/auth/AuthRepositoryInterface";

export class AuthRepository extends Repository implements AuthRepositoryInterface {
    public async login(data: LoginData) {
        return this.post<'json', LoginResponse>('/api/auth/login', {data})
    }

    public async logout() {
        return this.post<'json', LogoutResponse>('/api/auth/logout')
    }

    public async me() {
        return this.get<'json', MeResponse>('/api/auth/me')
    }
}