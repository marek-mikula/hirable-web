export type LoginData = {
    email: string | null
    password: string | null
    rememberMe: boolean
}

type UpdateKey =
    'firstname' |
    'lastname' |
    'email' |
    'timezone' |
    'password' |
    'notificationTechnicalMail' |
    'notificationTechnicalApp' |
    'notificationMarketingMail' |
    'notificationMarketingApp' |
    'notificationApplicationMail' |
    'notificationApplicationApp' |
    'language' |
    'prefix' |
    'postfix' |
    'phone'

export type UpdateData = {
    keys: UpdateKey[],
    firstname?: string | null
    lastname?: string | null
    email?: string | null
    timezone?: string | null
    password?: string | null
    oldPassword?: string | null
    passwordConfirm?: string | null
    notificationTechnicalMail?: boolean
    notificationTechnicalApp?: boolean
    notificationMarketingMail?: boolean
    notificationMarketingApp?: boolean
    notificationApplicationMail?: boolean
    notificationApplicationApp?: boolean
    language?: string | null
    prefix?: string | null
    postfix?: string | null
    phone?: string | null
}