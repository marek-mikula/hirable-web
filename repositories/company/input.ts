type UpdateKey =
    'name' |
    'email' |
    'idNumber' |
    'website'

export type UpdateData = {
    keys: UpdateKey[],
    name?: string | null
    email?: string | null
    idNumber?: string | null
    website?: string | null
}