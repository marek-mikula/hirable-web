import type {
    ROLE,
    LANGUAGE,
    FILE_TYPE,
    GRID,
    ORDER,
} from "~/types/enums";
import type {
    StringMap,
} from "~/types/common";

export type PaginationMeta = {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
}

export type PaginatedResource<R> = {
    data: R[]
    meta: PaginationMeta
}

export type Company = {
    id: number
    name: string
    idNumber: string
    email: string
    website: string | null
    createdAt: string
}

export type File = {
    id: number
    type: FILE_TYPE
    extension: string
    name: string
    mime: string
    size: number
    data: StringMap<any>
}

export type AuthUser = {
    id: number
    companyRole: ROLE
    language: LANGUAGE
    timezone: string | null
    firstname: string
    lastname: string
    fullName: string
    prefix: string | null
    postfix: string | null
    phone: string | null
    email: string
    notifications: {
        technical: {
            mail: boolean
            app: boolean
        }
        marketing: {
            mail: boolean
            app: boolean
        }
        application: {
            mail: boolean
            app: boolean
        }
    }
    company: Company
}

export type User = {
    id: number
    firstname: string
    lastname: string
    fullName: string
    prefix: string | null
    postfix: string | null
    phone: string
    email: string
    role: string
    createdAt: string
}

export type Candidate = {
    id: number
    firstname: string
    lastname: string
    fullName: string
    email: string
    phonePrefix: string | null
    phone: string | null
    linkedin: string | null
    createdAt: string
}

export type SearchResult = {
    value: string | number
    label: string
}

export type GridColumn = {
    key: string
    label: string
    enabled: boolean
    width: number | null
    minWidth: number | null
    maxWidth: number | null
    allowToggle: boolean
    allowSort: boolean
}

export type GridAction = {
    key: string
    label: string
    needsRefresh: boolean,
}

export type GridQuery = {
    page: number | null
    searchQuery: string | null
    sort: StringMap<ORDER>
}

export type Grid = {
    identifier: GRID
    keyAttribute: string
    allowSearch: boolean
    allowSettings: boolean
    allowFilter: boolean
    columns: GridColumn[]
    actions: GridAction[]
    perPage: number
    stickyHeader: boolean
    stickyFooter: boolean
}

export type TokenInvitation = {
    id: number
    email: string
    role: ROLE
    isExpired: boolean
    isUsed: boolean
    link: string
    usedAt: string | null
    validUntil: string
    createdAt: string
}