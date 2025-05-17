import type {NinjaToasterInstance} from "@cssninja/nuxt-toaster";
import CommonToast from '~/components/common/Toast.vue'
import _ from 'lodash'
import type {NinjaToasterShow} from "@cssninja/nuxt-toaster/dist/module";
import type {Translation} from "~/types/common";

export type ToastOptions = {
    // component props
    title: string | Translation
    message?: string | Translation
    closable?: boolean
    showTimer?: boolean
    html?: boolean

    // notifier props
    duration?: number
    onShow?: (toast: NinjaToasterShow) => void
    onClose?: () => void
    onClick?: (event: Event) => void
}

export class Toaster {
    constructor(private instance: NinjaToasterInstance) {
    }

    public async success(options: ToastOptions) {
        return await this.instance.show({
            content: () => h(CommonToast, {
                ..._.pick(options, [
                    'title',
                    'message',
                    'closable',
                    'showTimer',
                    'html',
                ]),
                type: 'success',
            }),
            ..._.pick(options, [
                'duration',
                'onShow',
                'onClose',
                'onClick',
            ])
        })
    }

    public async error(options: ToastOptions) {
        return await this.instance.show({
            content: () => h(CommonToast, {
                ..._.pick(options, [
                    'title',
                    'message',
                    'closable',
                    'showTimer',
                    'html',
                ]),
                type: 'danger',
            }),
            ..._.pick(options, [
                'duration',
                'onShow',
                'onClose',
                'onClick',
            ])
        })
    }

    public async warning(options: ToastOptions) {
        return await this.instance.show({
            content: () => h(CommonToast, {
                ..._.pick(options, [
                    'title',
                    'message',
                    'closable',
                    'showTimer',
                    'html',
                ]),
                type: 'warning',
            }),
            ..._.pick(options, [
                'duration',
                'onShow',
                'onClose',
                'onClick',
            ])
        })
    }

    public async info(options: ToastOptions) {
        return await this.instance.show({
            content: () => h(CommonToast, {
                ..._.pick(options, [
                    'title',
                    'message',
                    'closable',
                    'showTimer',
                    'html',
                ]),
                type: 'info',
            }),
            ..._.pick(options, [
                'duration',
                'onShow',
                'onClose',
                'onClick',
            ])
        })
    }

    public clear(): void {
        this.instance.clearAll()
    }

    public async commonError(options?: Omit<ToastOptions, 'title' | 'html'>) {
        const email = useRuntimeConfig().public.contactEmail as string

        await this.error({
            title: {key: 'toast.common.error', values: {email}},
            html: true,
            ...(options || {}),
        })
    }
}

export default defineNuxtPlugin({
    name: 'toaster',
    async setup() {
        const instance = createNinjaToaster({
            duration: 5000,
            dismissible: false,
            pauseOnHover: true,
            theme: {
                containerId: 'toaster-container',
                containerClass: [
                    'flex',
                    'flex-col',
                    'fixed',
                    'inset-0',
                    'pointer-events-none',
                    'p-2',
                    'gap-2',
                    'flex-col-reverse',
                    'z-[150]'
                ],
                wrapperClass: [
                    'pointer-events-none',
                    // 'cursor-pointer',
                    'flex',
                    'justify-end',
                ],
                transition: {
                    enterActiveClass: 'transform ease-out duration-300 transition',
                    enterFromClass: 'translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
                    enterToClass: 'translate-y-0 opacity-100 sm:translate-x-0',
                    leaveActiveClass: 'transform ease-in duration-100',
                    leaveFromClass: 'opacity-100 sm:translate-x-0 translate-y-0',
                    leaveToClass: 'opacity-0 sm:translate-x-1 translate-y-1 sm:translate-y-0'
                }
            }
        })

        const toaster = new Toaster(instance)

        return {
            provide: {
                toaster
            }
        }
    }
})