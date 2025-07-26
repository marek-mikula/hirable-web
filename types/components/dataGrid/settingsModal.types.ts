export type SettingsModalData = {
    perPage: number,
    stickyHeader: boolean,
    stickyFooter: boolean,
    columns: {
        key: string
        enabled: boolean
        label: string
        allowToggle: boolean
    }[]
}