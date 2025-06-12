import type {Response} from "~/types/request";
import type {GRID} from "~/types/enums";
import type {ResetResponse, SetColumnWidthResponse, UpdateResponse} from "~/repositories/grid/responses";
import type {SetColumnWidthData, UpdateSettingsData} from "~/repositories/grid/inputs";

export interface GridSettingRepositoryInterface {
    update(grid: GRID, data: UpdateSettingsData): Promise<Response<'json', UpdateResponse>>
    setColumnWidth(grid: GRID, data: SetColumnWidthData): Promise<Response<'json', SetColumnWidthResponse>>
    reset(grid: GRID): Promise<Response<'json', ResetResponse>>
}