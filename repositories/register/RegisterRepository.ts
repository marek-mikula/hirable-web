import {Repository} from "~/repositories/Repository";
import type {
    RequestData,
    RegisterData,
} from "~/repositories/register/inputs";
import type {
    RequestResponse,
    RegisterResponse,
} from "~/repositories/register/responses";
import type {RegisterRepositoryInterface} from "~/repositories/register/RegisterRepositoryInterface";

export class RegisterRepository extends Repository implements RegisterRepositoryInterface {
    public async requestRegistration(data: RequestData) {
        return this.post<RequestResponse>('/api/register/request', {data})
    }

    public async register(token: string, data: RegisterData) {
        return this.post<RegisterResponse>('/api/register', {
            data,
            query: {
                token
            }
        })
    }
}