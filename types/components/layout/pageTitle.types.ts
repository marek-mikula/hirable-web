import type {AnyComponent, Promisable} from "~/types/common";
import type {ButtonVariant} from "~/types/components/common/button.types";
import type {TooltipOptions} from "~/types/directives/tooltip.types";

export type PageTitleAction = {
    handler: () => Promisable<void>
    label?: string
    icon?: AnyComponent
    variant?: ButtonVariant
    tooltip?: TooltipOptions
}