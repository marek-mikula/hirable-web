import type {Response} from "~/types/request";
import type {GRID} from "~/types/enums";
import type {ShowResponse} from "~/repositories/grid/responses";

export interface GridRepositoryInterface {
    show(grid: GRID): Promise<Response<'json', ShowResponse>>
}