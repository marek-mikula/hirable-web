import type {UpdateData} from "~/repositories/company/input";
import type {UpdateResponse} from "~/repositories/company/response";
import type {Response} from "~/types/request";

export interface CompanyRepositoryInterface {
    update(data: UpdateData): Response<UpdateResponse, 'json'>
}