import type {FormatterInterface} from "~/types/plugins/formatter.types";

// typed composable for Formatter, because
// Nuxt has bugs with typing custom app-wide
// props

export const useFormatter = (): FormatterInterface => {
    const { $formatter } = useNuxtApp()
    return $formatter as FormatterInterface
}