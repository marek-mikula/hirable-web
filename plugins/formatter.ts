import type {FormatterInterface} from "~/types/plugins/formatter.types";

class Formatter implements FormatterInterface {
    public currency(value: number, currency: string = 'CZK'): string {
        return (new Intl.NumberFormat('cs', {
            style: 'currency',
            currency,
        })).format(value)
    }

    public datetime(value: string): string {
        return useMoment()(value).format('D. M. YYYY, HH:m')
    }

    public date(value: string): string {
        return useMoment()(value).format('D. M. YYYY')
    }

    public time(value: string): string {
        return useMoment()(value).format('HH:mm')
    }

    public fromNow(value: string): string {
        return useMoment()(value).startOf('day').fromNow()
    }
}

export default defineNuxtPlugin({
    name: 'formatter',
    dependsOn: ['moment'],
    async setup() {
        const formatter = new Formatter()

        return {
            provide: {
                formatter
            }
        }
    }
})