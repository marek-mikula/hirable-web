import type {UpdateData} from "~/repositories/company/inputs";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/responses";
import type {Response} from "~/types/request";

export interface CompanyRepositoryInterface {
    show(id: number): Promise<Response<'json', ShowResponse>>
    update(id: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
}