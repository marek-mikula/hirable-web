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
    OFFER_STATE,
    ACTION_INTERVIEW_RESULT,
    ACTION_ASSESSMENT_CENTER_RESULT,
    ACTION_TASK_RESULT,
    EVALUATION_STATE,
} from "~/types/enums";

export interface PaginationMeta {
    currentPage: number
    from: number
    lastPage: number
    perPage: number
    to: number
    total: number
}

export interface PaginatedResource<R> {
    data: R[]
    meta: PaginationMeta
}

export interface Company {
    id: number
    name: string
    idNumber: string
    email: string
    website: string | null
    aiOutputLanguage: LANGUAGE
    createdAt: string
    updatedAt: string
}

export interface CompanyContact {
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

export interface File {
    id: number
    type: FILE_TYPE
    extension: string
    name: string
    mime: string
    size: number
    data: Record<string, any>
}

export interface AuthUser {
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

export interface User {
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
    updatedAt: string
}

export interface UserContact {
    fullName: string
    phone: string | null
    email: string
}

export interface Candidate {
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
}

export interface CandidateShow extends Candidate {
    cvs: File[]
    otherFiles: File[]
}

export interface SearchResult {
    value: string | number
    label: string
}

export interface GridColumn {
    key: string
    label: string
    enabled: boolean
    width: number | null
    minWidth: number | null
    maxWidth: number | null
    allowToggle: boolean
    allowSort: boolean
}

export interface GridAction {
    key: string
    label: string
    needsRefresh: boolean,
}

export interface GridQuery {
    page: number | null
    searchQuery: string | null
    sort: Record<string, ORDER>
}

export interface Grid {
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

export interface TokenInvitation {
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

export interface Classifier {
    value: string
    label: string
}

export interface PositionApprovalBase {
    id: number
    positionId: number
    role: POSITION_ROLE | null
    state: POSITION_APPROVAL_STATE
    round: number
    note: string | null
    decidedAt: string | null
    remindedAt: string | null
    model: User | CompanyContact | null
    createdAt: string
    updatedAt: string
}

export interface PositionApprovalApprover extends PositionApprovalBase {
    role: POSITION_ROLE.APPROVER
    model: User
}

export interface PositionApprovalExternalApprover extends PositionApprovalBase {
    role: POSITION_ROLE.EXTERNAL_APPROVER
    model: CompanyContact
}

export interface PositionApprovalDeleted extends PositionApprovalBase {
    role: null
    model: null
}

export type PositionApproval =
    PositionApprovalApprover |
    PositionApprovalExternalApprover |
    PositionApprovalDeleted

export interface PositionSalary {
    from: number
    to: number | null
    type: Classifier
    frequency: Classifier
    currency: Classifier
    var: string | null
}

export interface Position {
    id: number
    userId: number
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
}

export interface PositionShow extends Position {
    files: File[]
    hiringManagers: User[]
    recruiters: User[]
    approvers: User[]
    externalApprovers: CompanyContact[]
    approvals: PositionApproval[]
    user: User
}

export interface PositionList extends Position {
    approvals: PositionApproval[]
}

export interface GeneratedPosition {
    name?: string
    field?: Classifier
    workloads?: Classifier[]
    employmentRelationships?: Classifier[]
    employmentForms?: Classifier[]
    jobSeatsNum?: number
    description?: string
    salaryFrom?: number
    salaryTo?: number
    salaryType?: Classifier
    salaryFrequency?: Classifier
    salaryCurrency?: Classifier
    salaryVar?: string
    benefits?: Classifier[]
    minEducationLevel?: Classifier
    educationField?: string
    seniority?: Classifier[]
    experience?: number
    hardSkills?: string
    organisationSkills?: number
    teamSkills?: number
    timeManagement?: number
    communicationSkills?: number
    leadership?: number
    languageRequirements?: { language: Classifier, level: Classifier }[]
    tags?: string[]
}

export interface PositionApply {
    name: string
    workloads: Classifier[]
    employmentRelationships: Classifier[]
    employmentForms: Classifier[]
    address: string | null
    benefits: Classifier[]
    salary: PositionSalary | null
    contact: UserContact | null
    companyName: string
    companyWebsite: string | null
    createdAt: string
    updatedAt: string
}

export interface PositionCandidate {
    id: number
    positionId: number
    score: {
        score: number
        weight: number
        comment: string
        category: string
    }[]
    totalScore: number | null
    isScoreCalculated: boolean
    idleDays: number
    createdAt: string
    updatedAt: string
    sharesCount: number
    step: PositionProcessStep
    candidate: Candidate
    actions: PositionCandidateAction[]
}

export interface PositionProcessStep {
    id: number
    positionId: number
    step: PROCESS_STEP | string
    label: string | null
    order: number
    isCustom: boolean
    isFixed: boolean
    isRepeatable: boolean
    triggersAction: ACTION_TYPE | null
}

export interface ProcessStep {
    id: number
    step: PROCESS_STEP | string
    isRepeatable: boolean
    isCustom: boolean
    triggersAction: ACTION_TYPE | null
}

export interface Notification {
    id: number
    type: NOTIFICATION_TYPE
    data: object
    readAt: string | null
    createdAt: string
}

export interface TokenInfo {
    position: PositionApply
}

export interface Application {
    uuid: string
}

export interface PositionCandidateAction {
    id: number
    positionProcessStepId: number
    positionCandidateId: number
    userId: number
    type: ACTION_TYPE
    state: ACTION_STATE
    date: string | null
    timeStart: string | null
    timeEnd: string | null
    place: string | null
    instructions: string | null
    evaluation: string | null
    name: string | null
    interviewForm: Classifier | null
    interviewType: Classifier | null
    interviewResult: ACTION_INTERVIEW_RESULT | null
    assessmentCenterResult: ACTION_ASSESSMENT_CENTER_RESULT | null
    rejectedByCandidate: boolean | null
    rejectionReason: Classifier | null
    refusalReason: Classifier | null
    taskType: Classifier | null
    taskResult: ACTION_TASK_RESULT | null
    offerState: OFFER_STATE | null
    offerJobTitle: string | null
    offerCompany: string | null
    offerEmploymentForms: Classifier[] | null
    offerPlace: string | null
    offerSalary: number | null
    offerSalaryCurrency: Classifier | null
    offerSalaryFrequency: Classifier | null
    offerWorkload: Classifier | null
    offerEmploymentRelationship: Classifier | null
    offerStartDate: string | null
    offerEmploymentDuration: Classifier | null
    offerCertainPeriodTo: string | null
    offerTrialPeriod: number | null
    offerCandidateNote: string | null
    realStartDate: string | null
    note: string | null
    createdAt: string
    updatedAt: string
}

export interface PositionCandidateShare {
    id: number
    positionCandidateId: number
    createdAt: string
    updatedAt: string
    creator: User
    user: User
}

export interface PositionCandidateEvaluation {
    id: number
    positionCandidateId: number
    state: EVALUATION_STATE
    evaluation: string | null
    stars: number | null
    fillUntil: string | null
    createdAt: string
    updatedAt: string
    creator: User
    user: User
}
