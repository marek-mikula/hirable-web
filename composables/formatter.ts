import type {Formatter} from "~/plugins/formatter";

// typed composable for Formatter, because
// Nuxt has bugs with typing custom app-wide
// props

export const useFormatter = (): Formatter => {
    const { $formatter } = useNuxtApp()
    return $formatter as Formatter
}