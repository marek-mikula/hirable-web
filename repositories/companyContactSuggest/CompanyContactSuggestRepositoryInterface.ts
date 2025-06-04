import type {Response} from "~/types/request";
import type {SuggestResponse} from "~/repositories/companyContactSuggest/responses";

export interface CompanyContactSuggestRepositoryInterface {
    companies(q: string | null): Response<SuggestResponse, 'json'>
}