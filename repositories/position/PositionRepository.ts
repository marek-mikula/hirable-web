import {Repository} from "~/repositories/Repository";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {
    DeleteResponse,
    DuplicateResponse,
    IndexResponse,
    KanbanResponse,
    ShowResponse,
    StoreResponse,
    SetProcessStepOrderResponse,
    UpdateResponse,
    CancelApprovalResponse,
    GenerateFromFileResponse,
    GenerateFromPromptResponse
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {SetProcessStepOrderData} from "~/repositories/position/inputs";

export class PositionRepository extends Repository implements PositionRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.get<'json', IndexResponse>('/api/positions', { query: gridQuery })
    }

    public async store(data: FormData) {
        return this.post<'json', StoreResponse>('/api/positions', { data })
    }

    public async update(id: number, data: FormData) {
        return this.patch<'json', UpdateResponse>(`/api/positions/${id}`, { data })
    }

    public async show(id: number) {
        return this.get<'json', ShowResponse>(`/api/positions/${id}`)
    }

    public async deletePosition(id: number) {
        return this.delete<'json', DeleteResponse>(`/api/positions/${id}`)
    }

    public async duplicate(id: number) {
        return this.post<'json', DuplicateResponse>(`/api/positions/${id}/duplicate`)
    }

    public async cancelApproval(id: number) {
        return this.patch<'json', CancelApprovalResponse>(`/api/positions/${id}/cancel-approval`)
    }

    public async setProcessStepOrder(id: number, data: SetProcessStepOrderData) {
        return this.patch<'json', SetProcessStepOrderResponse>(`/api/positions/${id}/set-process-step-order`, {data})
    }

    public async kanban(id: number) {
        return this.get<'json', KanbanResponse>(`/api/positions/${id}/kanban`)
    }

    public async generateFromPrompt(prompt: string) {
        return this.post<'json', GenerateFromPromptResponse>('/api/positions/generate-from-prompt', {
            data: {
                prompt
            }
        })
    }

    public async generateFromFile(file: File) {
        return this.post<'json', GenerateFromFileResponse>('/api/positions/generate-from-file', {
            data: {
                file
            }
        })
    }
}