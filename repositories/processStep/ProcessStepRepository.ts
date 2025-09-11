import {Repository} from "~/repositories/Repository";
import type {StoreData} from "~/repositories/processStep/inputs";
import type {ProcessStepRepositoryInterface} from "~/repositories/processStep/ProcessStepRepositoryInterface";
import type {IndexResponse, StoreResponse, DeleteResponse, UpdateResponse} from "~/repositories/processStep/responses";

export class ProcessStepRepository extends Repository implements ProcessStepRepositoryInterface {
    public async index(includeCommon?: boolean) {
        return this.client.get<'json', IndexResponse>('/api/process-steps', {
            query: {
                includeCommon: includeCommon ? '1' : '0'
            }
        })
    }

    public async store(data: StoreData) {
        return this.client.post<'json', StoreResponse>('/api/process-steps', {data})
    }

    public async update(id: number, data: StoreData) {
        return this.client.patch<'json', UpdateResponse>(`/api/process-steps/${id}`, {data})
    }

    public async delete(id: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/process-steps/${id}`)
    }
}