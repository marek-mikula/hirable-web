export interface FormatterInterface {
    currency(value: number, currency: string): string
    datetime(value: string): string
    date(value: string): string
    time(value: string): string
    fromNow(value: string): string
}