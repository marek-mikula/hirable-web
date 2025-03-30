import tooltip from "~/directives/tooltip";

export default defineNuxtPlugin({
    name: 'directive',
    async setup(nuxtApp) {
        nuxtApp.vueApp.directive('tooltip', tooltip)
    }
})