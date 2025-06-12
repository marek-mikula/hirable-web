import type {Response} from "~/types/request";
import type {IndexResponse} from "~/repositories/companyUser/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export interface CompanyUserRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
}