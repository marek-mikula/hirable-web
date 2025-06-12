import {Repository} from "~/repositories/Repository";
import type {CandidateRepositoryInterface} from "~/repositories/candidate/CandidateRepositoryInterface";
import type {IndexResponse} from "~/repositories/candidate/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class CandidateRepository extends Repository implements CandidateRepositoryInterface {
    public async index(gridQuery: GridQueryString) {
        return this.get<'json', IndexResponse>('/api/candidates', { query: gridQuery })
    }
}