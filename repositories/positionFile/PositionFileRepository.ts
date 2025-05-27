import {Repository} from "~/repositories/Repository";
import type {PositionFileRepositoryInterface} from "~/repositories/positionFile/PositionFileRepositoryInterface";
import type {DestroyResponse} from "~/repositories/positionFile/responses";

export class PositionFileRepository extends Repository implements PositionFileRepositoryInterface {
    public destroy(position: number, file: number) {
        return this.delete<DestroyResponse>(`/api/positions/${position}/files/${file}`)
    }
}