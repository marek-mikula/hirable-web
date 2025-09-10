import type {Response} from "~/types/request";
import type {DeleteResponse} from "~/repositories/file/responses";

export interface FileRepositoryInterface {
    show(id: number): Promise<Response<'blob', any>>
    download(id: number): Promise<Response<'blob', any>>
    delete(id: number): Promise<Response<'json', DeleteResponse>>
}