import type {Response} from "~/types/request";
import type {IndexResponse} from "~/repositories/companyUser/response";
import type {GridQueryString} from "~/types/grid";

export interface CompanyUserRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
}