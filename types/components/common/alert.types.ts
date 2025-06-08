import type {Promisable, Translation} from "~/types/common";

export type AlertVariant = 'success' | 'info' | 'warning' | 'danger' | 'secondary'

export type AlertAction = {
    handler: () => Promisable<void>
    label: Translation
    loading?: boolean
}