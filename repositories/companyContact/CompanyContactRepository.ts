import {Repository} from "~/repositories/Repository";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CompanyContactRepositoryInterface} from "~/repositories/companyContact/CompanyContactRepositoryInterface";
import type {StoreData} from "~/repositories/companyContact/inputs";
import type {IndexResponse, StoreResponse} from "~/repositories/companyContact/responses";

export class CompanyContactRepository extends Repository implements CompanyContactRepositoryInterface {
    public index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/company/contacts', { query: gridQuery })
    }

    public store(data: StoreData) {
        return this.post<StoreResponse>('/api/company/contacts', { data })
    }
}