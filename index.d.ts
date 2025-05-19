import type moment from "moment";
import type {FormatterInterface} from "~/types/plugins/formatter.types";
import type {ApiInterface} from "~/types/plugins/api.types";
import type {ToasterInterface} from "~/types/plugins/toaster.types";

declare module '#app' {
    interface _NuxtApp {
        $api: ApiInterface
        $toaster: ToasterInterface
        $formatter: FormatterInterface
        $moment: typeof moment
    }

    interface PageMeta {}
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $api: ApiInterface
        $toaster: ToasterInterface
        $formatter: FormatterInterface
        $moment: typeof moment
    }
}

export {}
