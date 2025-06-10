import type {Response} from "~/types/request";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {
    IndexResponse,
    StoreResponse,
    SuggestResponse,
    UpdateResponse
} from "~/repositories/companyContact/responses";
import type {StoreData, UpdateData} from "~/repositories/companyContact/inputs";

export interface CompanyContactRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Response<IndexResponse, 'json'>
    store(companyId: number, data: StoreData): Response<StoreResponse, 'json'>
    update(companyId: number, contactId: number, data: UpdateData): Response<UpdateResponse, 'json'>
    suggestCompanies(companyId: number, q: string | null): Response<SuggestResponse, 'json'>
}