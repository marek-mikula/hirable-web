import type {File} from "~/repositories/resources";
import type {AnyComponent, Promisable, Translation} from "~/types/common";

export type FileActionHandler = (file: File) => Promisable<void>

export type FileAction = {
    key: string
    handler: FileActionHandler,
    icon: AnyComponent
    label: Translation
}