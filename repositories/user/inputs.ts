export type UpdateKey =
    'firstname' |
    'lastname' |
    'email' |
    'password' |
    'language' |
    'prefix' |
    'postfix' |
    'phone'

export type UpdateData = {
    keys: UpdateKey[],
    firstname?: string | null
    lastname?: string | null
    email?: string | null
    password?: string | null
    oldPassword?: string | null
    passwordConfirm?: string | null
    language?: string | null
    prefix?: string | null
    postfix?: string | null
    phone?: string | null
}