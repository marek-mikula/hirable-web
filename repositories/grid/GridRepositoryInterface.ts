import type {Response} from "~/types/request";
import type {GRID} from "~/types/enums";
import type {ShowResponse} from "~/repositories/grid/response";

export interface GridRepositoryInterface {
    show(grid: GRID): Response<ShowResponse, 'json'>
}