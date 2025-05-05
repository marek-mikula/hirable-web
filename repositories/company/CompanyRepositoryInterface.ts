import type {UpdateData} from "~/repositories/company/input";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/response";
import type {Response} from "~/types/request";

export interface CompanyRepositoryInterface {
    show(): Response<ShowResponse, 'json'>
    update(data: UpdateData): Response<UpdateResponse, 'json'>
}