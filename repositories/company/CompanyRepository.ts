import {Repository} from "~/repositories/Repository";
import type {UpdateData} from "~/repositories/company/inputs";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/responses";
import type {CompanyRepositoryInterface} from "~/repositories/company/CompanyRepositoryInterface";

export class CompanyRepository extends Repository implements CompanyRepositoryInterface {
    public async show(id: number) {
        return this.client.get<'json', ShowResponse>(`/api/companies/${id}`)
    }

    public async update(id: number, data: UpdateData) {
        return this.client.patch<'json', UpdateResponse>(`/api/companies/${id}`, { data })
    }
}