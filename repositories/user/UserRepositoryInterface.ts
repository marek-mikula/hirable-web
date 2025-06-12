import type {Response} from "~/types/request";
import type {UpdateResponse} from "~/repositories/user/responses";
import type {UpdateData} from "~/repositories/user/inputs";

export interface UserRepositoryInterface {
    update(id: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
}