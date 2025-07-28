import {Repository} from "~/repositories/Repository";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {ProcessStepRepositoryInterface} from "~/repositories/processStep/ProcessStepRepositoryInterface";
import type {IndexResponse, StoreResponse, DeleteResponse, UpdateResponse} from "~/repositories/processStep/responses";

export class ProcessStepRepository extends Repository implements ProcessStepRepositoryInterface {
    public async index() {
        return this.get<'json', IndexResponse>('/api/process-steps')
    }

    public async store(data: StoreData) {
        return this.post<'json', StoreResponse>('/api/process-steps', {data})
    }

    public async update(id: number, data: StoreData) {
        return this.patch<'json', UpdateResponse>(`/api/process-steps/${id}`, {data})
    }

    public async deleteProcessStep(id: number) {
        return this.delete<'json', DeleteResponse>(`/api/process-steps/${id}`)
    }
}