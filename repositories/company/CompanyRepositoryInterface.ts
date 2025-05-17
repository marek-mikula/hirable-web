import type {UpdateData} from "~/repositories/company/inputs";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/responses";
import type {Response} from "~/types/request";

export interface CompanyRepositoryInterface {
    show(): Response<ShowResponse, 'json'>
    update(data: UpdateData): Response<UpdateResponse, 'json'>
}