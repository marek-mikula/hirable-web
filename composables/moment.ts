import type moment from "moment";

// typed composable for Moment.js, because
// Nuxt has bugs with typing custom app-wide
// props

export const useMoment = (): typeof moment => {
    const { $moment } = useNuxtApp()
    return $moment as typeof moment
}