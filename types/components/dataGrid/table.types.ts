import type {StringMap} from "~/types/common";
import type {RouteLocationRaw} from "vue-router";
import type {Promisable} from "~/types/common";
import type {PaginatedResource} from "~/repositories/resources";

export type DataGridTableExpose = {
    refresh: () => Promise<void>
}

export type GridQueryString = StringMap<string>

export type DataGridLinker = (item: object) => RouteLocationRaw

export type DataGridActionHandler = (items: object[]) => Promisable<void>

export type DataGridCallee = (query: GridQueryString) => Promisable<PaginatedResource<object>>