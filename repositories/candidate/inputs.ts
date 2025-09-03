export type UpdateKey =
    'firstname' |
    'lastname' |
    'gender' |
    'language' |
    'email' |
    'phone' |
    'linkedin' |
    'instagram' |
    'github' |
    'portfolio' |
    'birthDate' |
    'tags' |
    'cv' |
    'otherFiles'

export type UpdateData = {
    keys: UpdateKey[]
    firstname: string | null
    lastname: string | null
    gender: string | null
    language: string | null
    email: string | null
    phonePrefix: string | null
    phoneNumber: string | null
    linkedin: string | null
    instagram: string | null
    github: string | null
    portfolio: string | null
    birthDate: string | null
    tags: string[]
    cv: File | null
    otherFiles: File[]
}