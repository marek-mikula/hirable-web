import type {PolicyInterface} from "~/types/plugins/policy.types";

// typed composable for policies, because
// Nuxt has bugs with typing custom app-wide
// props
export const usePolicy = (): PolicyInterface => {
    const { $policy } = useNuxtApp()
    return $policy as PolicyInterface
}