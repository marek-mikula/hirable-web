export type RequestData = {
    email: string | null
}

export type RegisterData = {
    firstname: string | null
    lastname: string | null
    password: string | null
    passwordConfirm: string | null
    companyName?: string | null
    companyIdNumber?: string | null
    companyWebsite?: string | null
    companyEmail?: string | null
}