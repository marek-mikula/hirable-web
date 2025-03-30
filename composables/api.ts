import type {Api} from "~/plugins/api";

// typed composable for repositories, because
// Nuxt has bugs with typing custom app-wide
// props
export const useApi = (): Api => {
    const { $api } = useNuxtApp()
    return $api as Api
}