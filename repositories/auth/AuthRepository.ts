import {Repository} from "~/repositories/Repository";
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
import type {AuthRepositoryInterface} from "~/repositories/auth/AuthRepositoryInterface";

export class AuthRepository extends Repository implements AuthRepositoryInterface {
    public async login(data: LoginData) {
        return this.post<LoginResponse>('/api/auth/login', {data})
    }

    public async logout() {
        return this.post<LogoutResponse>('/api/auth/logout')
    }

    public async me() {
        return this.get<MeResponse>('/api/auth/me')
    }

    public async update(data: UpdateData) {
        return this.patch<UpdateResponse>('/api/auth', {
            data
        })
    }
}