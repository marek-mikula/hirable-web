export class Formatter {
    public currency(value: number, currency: string = 'CZK'): string {
        return (new Intl.NumberFormat('cs', {
            style: 'currency',
            currency,
        })).format(value)
    }
}

export default defineNuxtPlugin({
    name: 'formatter',
    async setup() {
        const formatter = new Formatter()

        return {
            provide: {
                formatter
            }
        }
    }
})