import {Repository} from "~/repositories/Repository";
import type {StoreData} from "~/repositories/positionProcessStep/inputs";
import type {StoreResponse} from "~/repositories/positionProcessStep/responses";
import type {PositionProcessStepRepositoryInterface} from "~/repositories/positionProcessStep/PositionProcessStepRepositoryInterface";

export class PositionProcessStepRepository extends Repository implements PositionProcessStepRepositoryInterface {
    public async store(positionId: number, data: StoreData) {
        return this.post<'json', StoreResponse>(`/api/positions/${positionId}/process-steps`, {data})
    }
}