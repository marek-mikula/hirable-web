export function calculate(operation: () => number, n = 2): number {
    const divider = Math.pow(10, n)
    return Math.round((operation() + Number.EPSILON) * divider) / divider
}