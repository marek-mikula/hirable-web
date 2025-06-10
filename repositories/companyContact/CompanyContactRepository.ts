import {Repository} from "~/repositories/Repository";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CompanyContactRepositoryInterface} from "~/repositories/companyContact/CompanyContactRepositoryInterface";
import type {StoreData} from "~/repositories/companyContact/inputs";
import type {IndexResponse, StoreResponse, SuggestResponse} from "~/repositories/companyContact/responses";

export class CompanyContactRepository extends Repository implements CompanyContactRepositoryInterface {
    public async index(companyId: number, gridQuery: GridQueryString) {
        return this.get<IndexResponse>(`/api/company/${companyId}/contacts`, { query: gridQuery })
    }

    public async store(companyId: number, data: StoreData) {
        return this.post<StoreResponse>(`/api/company/${companyId}/contacts`, { data })
    }

    public async suggestCompanies(companyId: number, q: string | null) {
        return this.get<SuggestResponse>(`/api/company/${companyId}/contacts/suggest-companies`, {
            query: { q }
        })
    }
}