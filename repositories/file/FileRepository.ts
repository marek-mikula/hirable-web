import {Repository} from "~/repositories/Repository";
import type {FileRepositoryInterface} from "~/repositories/file/FileRepositoryInterface";
import type {DeleteResponse} from "~/repositories/file/responses";

export class FileRepository extends Repository implements FileRepositoryInterface {
    public async show(id: number) {
        return this.get<'blob', any>(`/api/files/${id}`)
    }

    public async download(id: number) {
        return this.get<'blob', any>(`/api/files/${id}/download`)
    }

    public async deleteFile(id: number) {
        return this.delete<'json', DeleteResponse>(`/api/files/${id}`)
    }
}