import {Repository} from "~/repositories/Repository";
import type {GridRepositoryInterface} from "~/repositories/grid/GridRepositoryInterface";
import type {GRID} from "~/types/enums";
import type {ShowResponse} from "~/repositories/grid/response";

export class GridRepository extends Repository implements GridRepositoryInterface {
    public show(grid: GRID) {
        return this.get<ShowResponse>(`/api/grids/${grid}`)
    }
}