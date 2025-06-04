import type {Response} from "~/types/request";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {IndexResponse, StoreResponse} from "~/repositories/companyContact/responses";
import type {StoreData} from "~/repositories/companyContact/inputs";

export interface CompanyContactRepositoryInterface {
    index(gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    store(data: StoreData): Response<StoreResponse, 'json'>
}