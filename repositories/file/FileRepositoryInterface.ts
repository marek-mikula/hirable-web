import type {Response} from "~/types/request";
import type {DeleteResponse} from "~/repositories/file/responses";

export interface FileRepositoryInterface {
    show(id: number): Response<any,'blob'>
    deleteFile(id: number): Response<DeleteResponse,'json'>
}