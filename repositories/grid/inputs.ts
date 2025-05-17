export type UpdateSettingsData = {
    perPage: number,
    stickyHeader: boolean,
    stickyFooter: boolean,
    columns: {
        key: string
        enabled: boolean
    }[]
}

export type SetColumnWidthData = {
    key: string
    width: number
}