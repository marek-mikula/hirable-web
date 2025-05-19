import type {NinjaToasterInstance} from "@cssninja/nuxt-toaster";
import CommonToast from '~/components/common/Toast.vue'
import type {NinjaToasterShow} from "@cssninja/nuxt-toaster/dist/module";
import type {ToasterInterface, ToastOptions} from "~/types/plugins/toaster.types";
import _ from 'lodash'

class Toaster implements ToasterInterface {
    constructor(private instance: NinjaToasterInstance) {}

    public async success(options: ToastOptions): Promise<NinjaToasterShow> {
        return this.instance.show({
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

    public async error(options: ToastOptions): Promise<NinjaToasterShow> {
        return this.instance.show({
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

    public async warning(options: ToastOptions): Promise<NinjaToasterShow> {
        return this.instance.show({
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

    public async info(options: ToastOptions): Promise<NinjaToasterShow> {
        return this.instance.show({
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

    public async commonError(options?: Omit<ToastOptions, 'title' | 'html'>): Promise<NinjaToasterShow> {
        const email = useRuntimeConfig().public.contactEmail as string
        return this.error({
            title: {key: 'toast.common.error', values: {email}},
            html: true,
            ...(options || {}),
        })
    }

    public clear(): void {
        this.instance.clearAll()
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