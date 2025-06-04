import {Repository} from "~/repositories/Repository";
import type {
    RequestResetData,
    ResetData,
} from "~/repositories/password/inputs";
import type {
    RequestResetResponse,
    ResetResponse,
} from "~/repositories/password/responses";
import type {PasswordRepositoryInterface} from "~/repositories/password/PasswordRepositoryInterface";

export class PasswordRepository extends Repository implements PasswordRepositoryInterface {
    public async requestReset(data: RequestResetData) {
        return this.post<RequestResetResponse>('/api/password/request-reset', { data })
    }

    public async reset(token: string, data: ResetData) {
        return this.post<ResetResponse>('/api/password/reset', {
            data,
            query: {
                token,
            }
        })
    }
}