import {Repository} from "~/repositories/Repository";
import type {UpdateData} from "~/repositories/company/inputs";
import type {ShowResponse, UpdateResponse} from "~/repositories/company/responses";
import type {CompanyRepositoryInterface} from "~/repositories/company/CompanyRepositoryInterface";

export class CompanyRepository extends Repository implements CompanyRepositoryInterface {
    public async show(id: number) {
        return this.get<ShowResponse>(`/api/company/${id}`)
    }

    public async update(id: number, data: UpdateData) {
        return this.patch<UpdateResponse>(`/api/company/${id}`, { data })
    }
}