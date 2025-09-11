import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {
    DeleteResponse,
    DuplicateResponse,
    IndexResponse,
    ShowResponse,
    StoreResponse,
    UpdateResponse,
    CancelApprovalResponse,
    GenerateFromFileResponse,
    GenerateFromPromptResponse
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.client.get<'json', IndexResponse>('/api/positions', { query: gridQuery })
    }

    public async store(data: FormData) {
        return this.client.post<'json', StoreResponse>('/api/positions', { data })
    }

    public async update(id: number, data: FormData) {
        return this.client.patch<'json', UpdateResponse>(`/api/positions/${id}`, { data })
    }

    public async show(id: number) {
        return this.client.get<'json', ShowResponse>(`/api/positions/${id}`)
    }

    public async delete(id: number) {
        return this.client.delete<'json', DeleteResponse>(`/api/positions/${id}`)
    }

    public async duplicate(id: number) {
        return this.client.post<'json', DuplicateResponse>(`/api/positions/${id}/duplicate`)
    }

    public async cancelApproval(id: number) {
        return this.client.patch<'json', CancelApprovalResponse>(`/api/positions/${id}/cancel-approval`)
    }

    public async generateFromPrompt(prompt: string) {
        return this.client.post<'json', GenerateFromPromptResponse>('/api/positions/generate-from-prompt', {
            data: {
                prompt
            }
        })
    }

    public async generateFromFile(file: File) {
        const data = new FormData()
        data.set('file', file)

        return this.client.post<'json', GenerateFromFileResponse>('/api/positions/generate-from-file', {
            data
        })
    }
}