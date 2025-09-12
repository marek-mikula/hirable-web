import type {Placement} from "@popperjs/core";

export type TooltipOptions = {
    content: string
    placement?: Placement
    html?: boolean
}

export type TooltipBinding = string | TooltipOptions