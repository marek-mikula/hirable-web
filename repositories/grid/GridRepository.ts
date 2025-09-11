import {Repository} from "~/repositories/Repository";
import type {GridRepositoryInterface} from "~/repositories/grid/GridRepositoryInterface";
import type {GRID} from "~/types/enums";
import type {ShowResponse} from "~/repositories/grid/responses";

export class GridRepository extends Repository implements GridRepositoryInterface {
    public async show(grid: GRID) {
        return this.client.get<'json', ShowResponse>(`/api/grids/${grid}`)
    }
}