import type {ToasterInterface} from "~/types/plugins/toaster.types";

// typed composable for toaster messages, because
// Nuxt has bugs with typing custom app-wide
// props
export const useToaster = (): ToasterInterface => {
    const { $toaster } = useNuxtApp()
    return $toaster as ToasterInterface
}