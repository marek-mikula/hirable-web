import {Repository} from "~/repositories/Repository";
import type {CandidateRepositoryInterface} from "~/repositories/candidate/CandidateRepositoryInterface";
import type {IndexResponse} from "~/repositories/candidate/responses";
import type {GridQueryString} from "~/types/components/dataGrid/table.types";

export class CandidateRepository extends Repository implements CandidateRepositoryInterface {
    public index(gridQuery: GridQueryString) {
        return this.get<IndexResponse>('/api/candidates', { query: gridQuery })
    }
}