import type {
    ROLE,
    LANGUAGE,
    FILE_TYPE,
    GRID,
    ORDER,
    POSITION_STATE,
    POSITION_APPROVAL_STATE,
    POSITION_ROLE,
    NOTIFICATION_TYPE,
    PROCESS_STEP,
    GENDER,
    ACTION_STATE,
    ACTION_TYPE,
} from "~/types/enums";

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
    aiOutputLanguage: LANGUAGE
    createdAt: string
    updatedAt: string
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
    data: Record<string, any>
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
    fullQualifiedName: string
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
    phone: string | null
    email: string
    role: string
    createdAt: string
}

export type UserContact = Pick<
    User,
    'fullName' |
    'phone' |
    'email'
>

export type Candidate = {
    id: number
    companyId: number
    language: LANGUAGE
    gender: GENDER | null
    firstname: string
    lastname: string
    fullName: string
    email: string
    phonePrefix: string,
    phoneNumber: string,
    phone: string,
    linkedin: string | null
    linkedinUsername: string | null
    instagram: string | null
    github: string | null
    portfolio: string | null
    birthDate: string | null
    experience: {
        position: string
        employer: string
        from: string | null
        to: string | null
        description: string | null
    }[]
    tags: string[]
    createdAt: string
    updatedAt: string
    cvs: File[]
    otherFiles: File[]
}

export type CandidateList = Pick<
    Candidate,
    'id' |
    'companyId' |
    'firstname' |
    'lastname' |
    'fullName' |
    'email' |
    'phonePrefix' |
    'phoneNumber' |
    'phone' |
    'createdAt' |
    'updatedAt'
>

export type CandidateSimple = Pick<
    Candidate,
    'id' |
    'companyId' |
    'firstname' |
    'lastname' |
    'fullName' |
    'email' |
    'phonePrefix' |
    'phoneNumber' |
    'phone' |
    'createdAt' |
    'updatedAt'
>

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
    sort: Record<string, ORDER>
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

export type PositionSalary = {
    from: number
    to: number | null
    type: Classifier
    frequency: Classifier
    currency: Classifier
    var: string | null
}

export type Position = {
    id: number
    companyId: number
    name: string
    externName: string
    state: POSITION_STATE
    approveUntil: string | null
    approveMessage: string | null
    approveRound: number | null
    department: string | null
    field: Classifier | null
    workloads: Classifier[]
    employmentRelationships: Classifier[]
    employmentForms: Classifier[]
    jobSeatsNum: number
    description: string
    address: string | null
    salary: PositionSalary
    benefits: Classifier[]
    minEducationLevel: Classifier | null
    educationField: string | null
    seniority: Classifier[]
    experience: number | null
    hardSkills: string | null
    organisationSkills: number
    teamSkills: number
    timeManagement: number
    communicationSkills: number
    leadership: number
    languageRequirements: { language: Classifier, level: Classifier }[]
    note: string | null
    hardSkillsWeight: number
    softSkillsWeight: number
    languageSkillsWeight: number
    experienceWeight: number
    educationWeight: number
    shareSalary: boolean
    shareContact: boolean
    tags: string[]
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
    user: User
}

export type PositionList = Pick<
    Position,
    'id' |
    'approveRound' |
    'state' |
    'name' |
    'department' |
    'createdAt' |
    'updatedAt' |
    'approvals'
> & {
    userId: number
}

export type GeneratedPosition = Partial<{
    name: string
    field: Classifier
    workloads: Classifier[]
    employmentRelationships: Classifier[]
    employmentForms: Classifier[]
    jobSeatsNum: number
    description: string
    salaryFrom: number
    salaryTo: number
    salaryType: Classifier
    salaryFrequency: Classifier
    salaryCurrency: Classifier
    salaryVar: string
    benefits: Classifier[]
    minEducationLevel: Classifier
    educationField: string
    seniority: Classifier[]
    experience: number
    hardSkills: string
    organisationSkills: number
    teamSkills: number
    timeManagement: number
    communicationSkills: number
    leadership: number
    languageRequirements: { language: Classifier, level: Classifier }[]
    tags: string[]
}>

export type PositionApply = Pick<
    Position,
    'name' |
    'workloads' |
    'employmentRelationships' |
    'employmentForms' |
    'address' |
    'benefits' |
    'createdAt' |
    'updatedAt'
> & {
    salary: PositionSalary | null
    contact: UserContact | null
    companyName: string
    companyWebsite: string | null
}

export type PositionCandidate = {
    id: number
    score: {
        score: number
        weight: number
        comment: string
        category: string
    }[]
    totalScore: number | null
    isScoreCalculated: boolean
    candidate: CandidateSimple
    createdAt: string
    updatedAt: string
}

export type PositionProcessStep = {
    id: number
    step: PROCESS_STEP | string
    label: string | null
    order: number
    isCustom: boolean
    isFixed: boolean
    isRepeatable: boolean
    triggersAction: ACTION_TYPE | null
}

export type KanbanStep = {
    step: PositionProcessStep
    positionCandidates: PositionCandidate[]
}

export type ProcessStep = {
    id: number
    step: PROCESS_STEP | string
    isRepeatable: boolean
    isCustom: boolean
    triggersAction: ACTION_TYPE | null
}

export type Notification = {
    id: number
    type: NOTIFICATION_TYPE
    data: object
    readAt: string | null
    createdAt: string
}

export type TokenInfo = {
    position: PositionApply
}

export type Application = {
    uuid: string
}

export type PositionCandidateAction = {
    id: number
    type: ACTION_TYPE
    state: ACTION_STATE
    datetime_start: string | null
    datetime_end: string | null
    note: string | null
    address: string | null
    instructions: string | null
    result: string | null
    name: string | null
    interview_form: Classifier | null
    interview_type: Classifier | null
    rejection_reason: Classifier | null
    refusal_reason: Classifier | null
    testType: Classifier | null
    offer: {
        jobTitle: string | null
    } | null
    createdAt: string
    updatedAt: string
}
