export function formatNumberToK(num: number): string {
    if (num < 1000) {
        return num.toString()
    }

    return `${(num / 1000).toString().replace(/\.0$/, '')}K`;
}

export function getEnumValues<T extends object>(enumObj: T): (T[keyof T])[] {
    return Object.keys(enumObj)
        .filter((key) => isNaN(Number(key))) // filter out reverse-mapping keys (for numeric enums)
        .map((key) => enumObj[key as keyof T]);
}

function getEnumKeys<T extends object>(enumObj: T): (keyof T)[] {
    return Object.keys(enumObj)
        .filter((key) => isNaN(Number(key))) as (keyof T)[];
}