import {Repository} from "~/repositories/Repository";
import type {ApplicationRepositoryInterface} from "~/repositories/application/ApplicationRepositoryInterface";
import type {ApplyResponse, TokenInfoResponse} from "~/repositories/application/responses";

export class ApplicationRepository extends Repository implements ApplicationRepositoryInterface {
    public async tokenInfo(token: string) {
        return this.get<'json', TokenInfoResponse>('/api/applications/token-info', { query: { token }})
    }

    public async apply(token: string, data: FormData) {
        return this.post<'json', ApplyResponse>('/api/applications/apply', { query: { token }, data})
    }
}