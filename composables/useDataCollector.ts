import type {DataCollectorInterface} from "~/types/plugins/dataCollector.types";

// typed composable for policies, because
// Nuxt has bugs with typing custom app-wide
// props
export const useDataCollector = (): DataCollectorInterface => {
    const { $dataCollector } = useNuxtApp()
    return $dataCollector as DataCollectorInterface
}