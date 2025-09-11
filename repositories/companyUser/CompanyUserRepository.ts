import {Repository} from "~/repositories/Repository";
import type {IndexResponse} from "~/repositories/companyUser/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";
import type {CompanyUserRepositoryInterface} from "~/repositories/companyUser/CompanyUserRepositoryInterface";

export class CompanyUserRepository extends Repository implements CompanyUserRepositoryInterface {
    public async index(companyId: number, gridQuery: GridQueryString) {
        return this.client.get<'json', IndexResponse>(`/api/companies/${companyId}/users`, { query: gridQuery })
    }
}