import {Repository} from "~/repositories/Repository";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CompanyContactRepositoryInterface} from "~/repositories/companyContact/CompanyContactRepositoryInterface";
import type {StoreData, UpdateData} from "~/repositories/companyContact/inputs";
import type {IndexResponse, StoreResponse, SuggestResponse} from "~/repositories/companyContact/responses";

export class CompanyContactRepository extends Repository implements CompanyContactRepositoryInterface {
    public async index(companyId: number, gridQuery: GridQueryString) {
        return this.get<'json', IndexResponse>(`/api/companies/${companyId}/contacts`, { query: gridQuery })
    }

    public async store(companyId: number, data: StoreData) {
        return this.post<'json', StoreResponse>(`/api/companies/${companyId}/contacts`, { data })
    }

    public async update(companyId: number, contactId: number, data: UpdateData) {
        return this.patch<'json', StoreResponse>(`/api/companies/${companyId}/contacts/${contactId}`, { data })
    }

    public async deleteContact(companyId: number, contactId: number) {
        return this.delete<'json', StoreResponse>(`/api/companies/${companyId}/contacts/${contactId}`)
    }

    public async suggestCompanies(companyId: number, q: string | null) {
        return this.get<'json', SuggestResponse>(`/api/companies/${companyId}/contacts/suggest-companies`, {
            query: { q }
        })
    }
}