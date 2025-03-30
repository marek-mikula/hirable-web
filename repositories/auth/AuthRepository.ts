import {Repository} from "~/repositories/Repository";
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
import type {AuthRepositoryInterface} from "~/repositories/auth/AuthRepositoryInterface";

export class AuthRepository extends Repository implements AuthRepositoryInterface {
    public login(data: LoginData) {
        return this.post<LoginResponse>('/api/auth/login', {data})
    }

    public logout() {
        return this.post<LogoutResponse>('/api/auth/logout')
    }

    public me() {
        return this.get<MeResponse>('/api/auth/me')
    }

    public update(data: UpdateData) {
        return this.patch<UpdateResponse>('/api/auth', {
            data
        })
    }
}