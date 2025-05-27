import type {Response} from "~/types/request";
import type {DestroyResponse} from "~/repositories/positionFile/responses";

export interface PositionFileRepositoryInterface {
    destroy(position: number, file: number): Response<DestroyResponse, 'json'>
}