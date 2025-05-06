type UpdateKey =
    'name' |
    'email' |
    'idNumber' |
    'website' |
    'environment' |
    'benefits'

export type UpdateData = {
    keys: UpdateKey[],
    name?: string | null
    email?: string | null
    idNumber?: string | null
    website?: string | null
    environment?: string | null
    benefits?: string[]
}