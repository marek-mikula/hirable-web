import type moment from "moment";
import type {FormatterInterface} from "~/types/plugins/formatter.types";
import type {ApiInterface} from "~/types/plugins/api.types";
import type {ToasterInterface} from "~/types/plugins/toaster.types";
import type {PolicyInterface} from "~/types/plugins/policy.types";
import type {DataCollectorInterface} from "~/types/plugins/dataCollector.types";

declare module '#app' {
    interface _NuxtApp {
        $api: ApiInterface
        $policy: PolicyInterface
        $toaster: ToasterInterface
        $formatter: FormatterInterface
        $dataCollector: DataCollectorInterface
        $moment: typeof moment
    }

    interface PageMeta {}
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $api: ApiInterface
        $policy: PolicyInterface
        $toaster: ToasterInterface
        $formatter: FormatterInterface
        $dataCollector: DataCollectorInterface
        $moment: typeof moment
    }
}

export {}
