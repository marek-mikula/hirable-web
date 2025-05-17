import type {Response} from "~/types/request";
import type {GRID} from "~/types/enums";
import type {ResetResponse, SetColumnWidthResponse, UpdateResponse} from "~/repositories/grid/responses";
import type {SetColumnWidthData, UpdateSettingsData} from "~/repositories/grid/inputs";

export interface GridSettingRepositoryInterface {
    update(grid: GRID, data: UpdateSettingsData): Response<UpdateResponse, 'json'>
    setColumnWidth(grid: GRID, data: SetColumnWidthData): Response<SetColumnWidthResponse, 'json'>
    reset(grid: GRID): Response<ResetResponse, 'json'>
}