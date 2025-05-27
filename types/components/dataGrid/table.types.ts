import type {StringMap} from "~/types/common";

export type DataGridTableExpose = {
    refresh: () => Promise<void>
}

export type GridQueryString = StringMap<string>