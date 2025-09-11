import type {Response} from "~/types/request";
import type {DeleteResponse, IndexResponse, StoreResponse} from "~/repositories/positionCandidateShare/responses";
import type {StoreData} from "~/repositories/positionCandidateShare/inputs";

export interface PositionCandidateShareRepositoryInterface {
    index(positionId: number, positionCandidateId: number): Promise<Response<'json', IndexResponse>>
    store(positionId: number, positionCandidateId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    delete(positionId: number, positionCandidateId: number, id: number): Promise<Response<'json', DeleteResponse>>
}