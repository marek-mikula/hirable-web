export interface StoreData {
    evaluation: string | null
    stars: number | null
}

export interface UpdateData extends StoreData {}

export interface RequestData {
    users: number[]
    fillUntil: string | null
}