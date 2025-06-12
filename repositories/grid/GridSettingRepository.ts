import {Repository} from "~/repositories/Repository";
import type {GRID} from "~/types/enums";
import type {ResetResponse, SetColumnWidthResponse, UpdateResponse} from "~/repositories/grid/responses";
import type {GridSettingRepositoryInterface} from "~/repositories/grid/GridSettingRepositoryInterface";
import type {SetColumnWidthData, UpdateSettingsData} from "~/repositories/grid/inputs";

export class GridSettingRepository extends Repository implements GridSettingRepositoryInterface {
    public async update(grid: GRID, data: UpdateSettingsData) {
        return this.patch<'json', UpdateResponse>(`/api/grids/${grid}/settings`, {
            data
        })
    }

    public async setColumnWidth(grid: GRID, data: SetColumnWidthData) {
        return this.patch<'json', SetColumnWidthResponse>(`/api/grids/${grid}/settings/set-column-width`, {
            data
        })
    }

    public async reset(grid: GRID) {
        return this.patch<'json', ResetResponse>(`/api/grids/${grid}/settings/reset`)
    }
}