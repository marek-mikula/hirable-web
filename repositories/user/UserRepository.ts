import {Repository} from "~/repositories/Repository";
import type {UserRepositoryInterface} from "~/repositories/user/UserRepositoryInterface";
import type {IndexResponse} from "~/repositories/user/response";
import type {GridQueryString} from "~/types/grid";

export class UserRepository extends Repository implements UserRepositoryInterface {
    public index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/users', { query: gridQuery })
    }
}