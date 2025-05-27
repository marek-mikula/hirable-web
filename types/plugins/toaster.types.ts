import type {Translation} from "~/types/common";
import type {NinjaToasterShow} from "@cssninja/nuxt-toaster/dist/module";

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

export interface ToasterInterface {
    success(options: ToastOptions): Promise<NinjaToasterShow>
    error(options: ToastOptions): Promise<NinjaToasterShow>
    warning(options: ToastOptions): Promise<NinjaToasterShow>
    info(options: ToastOptions): Promise<NinjaToasterShow>
    commonError(options?: Omit<ToastOptions, 'title' | 'html'>): Promise<NinjaToasterShow>
    clear(): void
}