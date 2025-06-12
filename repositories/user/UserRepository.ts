import {Repository} from "~/repositories/Repository";
import type {UserRepositoryInterface} from "~/repositories/user/UserRepositoryInterface";
import type {UpdateResponse} from "~/repositories/user/responses";
import type {UpdateData} from "~/repositories/user/inputs";

export class UserRepository extends Repository implements UserRepositoryInterface {
    public async update(id: number, data: UpdateData) {
        return this.patch<'json', UpdateResponse>(`/api/users/${id}`, { data })
    }
}