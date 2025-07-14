export function formatNumberToK(num: number): string {
    if (num < 1000) {
        return num.toString()
    }

    return `${(num / 1000).toString().replace(/\.0$/, '')}K`;
}