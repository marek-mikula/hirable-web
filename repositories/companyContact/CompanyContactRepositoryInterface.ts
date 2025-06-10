import type {Response} from "~/types/request";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {IndexResponse, StoreResponse, SuggestResponse} from "~/repositories/companyContact/responses";
import type {StoreData} from "~/repositories/companyContact/inputs";

export interface CompanyContactRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    store(companyId: number, data: StoreData): Response<StoreResponse, 'json'>
    suggestCompanies(companyId: number, q: string | null): Response<SuggestResponse, 'json'>
}