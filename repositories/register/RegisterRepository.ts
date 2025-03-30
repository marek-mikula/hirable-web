import {Repository} from "~/repositories/Repository";
import type {
    RequestData,
    RegisterData,
} from "~/repositories/register/input";
import type {
    RequestResponse,
    RegisterResponse,
} from "~/repositories/register/response";
import type {RegisterRepositoryInterface} from "~/repositories/register/RegisterRepositoryInterface";

export class RegisterRepository extends Repository implements RegisterRepositoryInterface {
    public requestRegistration(data: RequestData) {
        return this.post<RequestResponse>('/api/register/request', {data})
    }

    public register(token: string, data: RegisterData) {
        return this.post<RegisterResponse>('/api/register', {
            data,
            query: {
                token
            }
        })
    }
}