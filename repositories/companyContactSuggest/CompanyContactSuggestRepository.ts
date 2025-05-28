import {Repository} from "~/repositories/Repository";
import type {CompanyContactSuggestRepositoryInterface} from "~/repositories/companyContactSuggest/CompanyContactSuggestRepositoryInterface";
import type {SuggestResponse} from "~/repositories/companyContactSuggest/responses";

export class CompanyContactSuggestRepository extends Repository implements CompanyContactSuggestRepositoryInterface {
    public companies(q: string | null) {
        return this.get<SuggestResponse>('/api/company/contacts/suggest/companies', {
            query: { q }
        })
    }
}