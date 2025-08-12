import tooltip from "~/directives/tooltip";

export default defineNuxtPlugin({
    name: 'directives',
    async setup(nuxtApp) {
        nuxtApp.vueApp.directive('tooltip', tooltip)
    }
})