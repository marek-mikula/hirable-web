import type {StringMap} from "~/types/common";

export default defineNuxtRouteMiddleware((to) => {
    // probably non-existing route
    if (to.name === undefined) {
        return
    }

    const map: StringMap<string> = {}

    if (to.name in map) {
        return navigateTo(map[to.name as string], { replace: true })
    }
})