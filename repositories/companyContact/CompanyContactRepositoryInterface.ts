import type {Response} from "~/types/request";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {
    IndexResponse,
    StoreResponse,
    SuggestResponse,
    UpdateResponse,
    DeleteResponse,
} from "~/repositories/companyContact/responses";
import type {StoreData, UpdateData} from "~/repositories/companyContact/inputs";

export interface CompanyContactRepositoryInterface {
    index(companyId: number, gridQuery: GridQueryString): Promise<Response<'json', IndexResponse>>
    store(companyId: number, data: StoreData): Promise<Response<'json', StoreResponse>>
    update(companyId: number, contactId: number, data: UpdateData): Promise<Response<'json', UpdateResponse>>
    delete(companyId: number, contactId: number): Promise<Response<'json', DeleteResponse>>
    suggestCompanies(companyId: number, q: string | null): Promise<Response<'json', SuggestResponse>>
}