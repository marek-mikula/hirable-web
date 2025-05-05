type UpdateKey =
    'name' |
    'email' |
    'idNumber' |
    'website' |
    'culture' |
    'benefits'

export type UpdateData = {
    keys: UpdateKey[],
    name?: string | null
    email?: string | null
    idNumber?: string | null
    website?: string | null
    culture?: string | null
    benefits?: string[]
}