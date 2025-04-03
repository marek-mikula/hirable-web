import type {Api} from "~/plugins/api";
import type {Toaster} from "~/plugins/toaster.client";
import type {Formatter} from "~/plugins/formatter";
import type moment from "moment";

declare module '#app' {
    interface _NuxtApp {
        $api: Api
        $toaster: Toaster
        $formatter: Formatter
        $moment: typeof moment
    }

    interface PageMeta {}
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $api: Api
        $toaster: Toaster
        $formatter: Formatter
        $moment: typeof moment
    }
}

export {}
