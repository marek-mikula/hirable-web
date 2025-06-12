import type {Response} from "~/types/request";
import type {
    DeleteResponse,
    DuplicateResponse,
    IndexResponse,
    ShowResponse,
    StoreResponse,
    UpdateResponse
} from "~/repositories/position/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface PositionRepositoryInterface {
    index(gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
    store(data: FormData): Promise<Response<'json', StoreResponse>>
    update(id: number, data: FormData): Promise<Response<'json', UpdateResponse>>
    show(id: number): Promise<Response<'json', ShowResponse>>
    deletePosition(id: number): Promise<Response<'json', DeleteResponse>>
    duplicate(id: number): Promise<Response<'json', DuplicateResponse>>
}