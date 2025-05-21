import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {StoreResponse} from "~/repositories/position/responses";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public store(data: FormData) {
        return this.post<StoreResponse>('/api/positions', { data })
    }
}