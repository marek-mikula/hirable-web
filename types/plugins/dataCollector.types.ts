import type {FormObject} from "~/types/common";

export interface DataCollectorInterface {
    collect(...objects: FormObject[]): FormData
}