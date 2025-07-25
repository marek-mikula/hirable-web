import {Repository} from "~/repositories/Repository";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {ProcessStepRepositoryInterface} from "~/repositories/processStep/ProcessStepRepositoryInterface";
import type {StoreResponse} from "~/repositories/processStep/responses";

export class ProcessStepRepository extends Repository implements ProcessStepRepositoryInterface {
    public async store(data: StoreData) {
        return this.post<'json', StoreResponse>(`/api/process-steps`, {data})
    }
}