import type {UpdateData} from "~/repositories/company/inputs";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/responses";
import type {Response} from "~/types/request";

export interface CompanyRepositoryInterface {
    show(id: number): Response<ShowResponse, 'json'>
    update(id: number, data: UpdateData): Response<UpdateResponse, 'json'>
}