import {Repository} from "~/repositories/Repository";
import type {CandidateRepositoryInterface} from "~/repositories/candidate/CandidateRepositoryInterface";
import type {IndexResponse, ShowResponse, UpdateResponse} from "~/repositories/candidate/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class CandidateRepository extends Repository implements CandidateRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.client.get<'json', IndexResponse>('/api/candidates', { query: gridQuery })
    }

    public async show(id: number) {
        return this.client.get<'json', ShowResponse>(`/api/candidates/${id}`)
    }

    public async update(id: number, data: FormData) {
        return this.client.patch<'json', UpdateResponse>(`/api/candidates/${id}`, { data })
    }
}