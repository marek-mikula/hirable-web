import type {Response} from "~/types/request";
import type {
    DeleteResponse,
    DuplicateResponse,
    IndexResponse,
    KanbanResponse,
    ShowResponse,
    StoreResponse,
    UpdateResponse,
    SetProcessStepOrderResponse,
    CancelApprovalResponse,
    GenerateFromPromptResponse,
    GenerateFromFileResponse,
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {SetProcessStepOrderData} from "~/repositories/position/inputs";

export interface PositionRepositoryInterface {
    index(gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
    store(data: FormData): Promise<Response<'json', StoreResponse>>
    update(id: number, data: FormData): Promise<Response<'json', UpdateResponse>>
    show(id: number): Promise<Response<'json', ShowResponse>>
    deletePosition(id: number): Promise<Response<'json', DeleteResponse>>
    duplicate(id: number): Promise<Response<'json', DuplicateResponse>>
    cancelApproval(id: number): Promise<Response<'json', CancelApprovalResponse>>
    setProcessStepOrder(id: number, data: SetProcessStepOrderData): Promise<Response<'json', SetProcessStepOrderResponse>>
    kanban(id: number): Promise<Response<'json', KanbanResponse>>
    generateFromPrompt(prompt: string): Promise<Response<'json', GenerateFromPromptResponse>>
    generateFromFile(file: File): Promise<Response<'json', GenerateFromFileResponse>>
}