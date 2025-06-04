import {Repository} from "~/repositories/Repository";
import type {IndexResponse} from "~/repositories/companyUser/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CompanyUserRepositoryInterface} from "~/repositories/companyUser/CompanyUserRepositoryInterface";

export class CompanyUserRepository extends Repository implements CompanyUserRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/company/users', { query: gridQuery })
    }
}