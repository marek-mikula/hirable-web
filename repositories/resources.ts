import type {
    ROLE,
    LANGUAGE,
    FILE_TYPE,
    GRID,
    ORDER,
    POSITION_STATE,
    POSITION_APPROVAL_STATE,
    POSITION_ROLE,
    NOTIFICATION_TYPE
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

export type CompanyContact = {
    id: number
    language: LANGUAGE
    firstname: string
    lastname: string
    fullName: string
    label: string
    email: string
    note: string | null
    companyName: string | null
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
    companyId: number
    companyRole: ROLE
    companyOwner: boolean
    companyName: string
    language: LANGUAGE
    firstname: string
    lastname: string
    fullName: string
    prefix: string | null
    postfix: string | null
    phone: string | null
    email: string
}

export type User = {
    id: number
    firstname: string
    lastname: string
    fullName: string
    label: string
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

export type Classifier = {
    value: string
    label: string
}

export type PositionApproval = {
    id: number
    positionId: number
    role: POSITION_ROLE.APPROVER
    state: POSITION_APPROVAL_STATE
    round: number
    note: string | null
    decidedAt: string | null
    remindedAt: string | null
    model: User
    createdAt: string
    updatedAt: string
} | {
    id: number
    positionId: number
    role: POSITION_ROLE.EXTERNAL_APPROVER
    state: POSITION_APPROVAL_STATE
    round: number
    note: string | null
    decidedAt: string | null
    remindedAt: string | null
    model: CompanyContact
    createdAt: string
    updatedAt: string
} | {
    id: number
    positionId: number
    role: null
    state: POSITION_APPROVAL_STATE
    round: number
    note: string | null
    decidedAt: string | null
    remindedAt: string | null
    model: null
    createdAt: string
    updatedAt: string
}

export type PositionList = {
    id: number
    userId: number
    approveRound: number | null
    state: POSITION_STATE
    name: string
    department: string | null
    createdAt: string
    updatedAt: string
    approvals: PositionApproval[]
}

export type Position = {
    id: number
    user: User
    companyId: number
    state: POSITION_STATE
    approveUntil: string | null
    approveMessage: string | null
    approveRound: number | null
    name: string
    department: string | null
    field: Classifier | null
    workloads: Classifier[]
    employmentRelationships: Classifier[]
    employmentForms: Classifier[]
    jobSeatsNum: number
    description: string
    isTechnical: boolean
    address: string | null
    salaryFrom: number
    salaryTo: number | null
    salaryType: Classifier
    salaryFrequency: Classifier
    salaryCurrency: Classifier
    salaryVar: string | null
    benefits: Classifier[]
    minEducationLevel: Classifier | null
    seniority: Classifier | null
    experience: number | null
    hardSkills: string | null
    organisationSkills: number // 0 - 10
    teamSkills: number // 0 - 10
    timeManagement: number // 0 - 10
    communicationSkills: number // 0 - 10
    leadership: number // 0 - 10
    languageRequirements: { language: Classifier, level: Classifier }[]
    note: string | null
    hardSkillsWeight: number // 0 - 10
    softSkillsWeight: number // 0 - 10
    languageSkillsWeight: number // 0 - 10
    commonLink: string | null
    internLink: string | null
    referralLink: string | null
    createdAt: string
    updatedAt: string
    files: File[]
    hiringManagers: User[]
    recruiters: User[]
    approvers: User[]
    externalApprovers: CompanyContact[]
    approvals: PositionApproval[]
}

export type Notification = {
    id: number
    type: NOTIFICATION_TYPE
    data: object
    readAt: string | null
    createdAt: string
}
