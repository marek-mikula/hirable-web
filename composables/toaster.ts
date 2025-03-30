import type {Toaster} from "~/plugins/toaster.client";

// typed composable for toaster messages, because
// Nuxt has bugs with typing custom app-wide
// props
export const useToaster = (): Toaster => {
    const { $toaster } = useNuxtApp()
    return $toaster as Toaster
}