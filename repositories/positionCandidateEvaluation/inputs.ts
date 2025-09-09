export interface StoreData {
    evaluation: string | null
    stars: number | null
}

export interface UpdateData extends StoreData {}

export interface RequestData {
    hiringManagers: number[]
    fillUntil: string | null
}