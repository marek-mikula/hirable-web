import {Repository} from "~/repositories/Repository";
import type {UpdateData} from "~/repositories/company/input";
import type {UpdateResponse} from "~/repositories/company/response";
import type {CompanyRepositoryInterface} from "~/repositories/company/CompanyRepositoryInterface";

export class CompanyRepository extends Repository implements CompanyRepositoryInterface {
    public update(data: UpdateData) {
        return this.patch<UpdateResponse>('/api/company', { data })
    }
}