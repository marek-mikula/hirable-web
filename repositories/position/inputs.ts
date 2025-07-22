export type UpdateKey =
    'name' |
    'externName' |
    'department' |
    'field' |
    'jobSeatsNum' |
    'description' |
    'address' |
    'salary' |
    'salaryType' |
    'salaryFrequency' |
    'salaryCurrency' |
    'salaryVar' |
    'minEducationLevel' |
    'seniority' |
    'experience' |
    'hardSkills' |
    'organisationSkills' |
    'teamSkills' |
    'timeManagement' |
    'communicationSkills' |
    'leadership' |
    'note' |
    'workloads' |
    'employmentRelationships' |
    'employmentForms' |
    'benefits' |
    'files' |
    'languageRequirements' |
    'hiringManagers' |
    'recruiters' |
    'approvers' |
    'externalApprovers' |
    'approveUntil' |
    'approveMessage' |
    'hardSkillsWeight' |
    'softSkillsWeight' |
    'languageSkillsWeight' |
    'experienceWeight' |
    'educationWeight' |
    'shareSalary' |
    'shareContact'

export type Operation = 'save' | 'sendForApproval' | 'open'

export type StoreData = {
    name: string | null
    externName: string | null
    department: string | null
    field: string | null
    workloads: string[]
    employmentRelationships: string[]
    employmentForms: string[]
    jobSeatsNum: number | null
    description: string | null
    address: string | null
    salaryFrom: number | null
    salaryTo: number | null
    salary: number | null
    salaryType: string | null
    salaryFrequency: string | null
    salaryCurrency: string | null
    salaryVar: string | null
    benefits: string[]
    minEducationLevel: string | null
    seniority: string[]
    experience: number | null
    hardSkills: string | null
    organisationSkills: number
    teamSkills: number
    timeManagement: number
    communicationSkills: number
    leadership: number
    note: string | null
    files: File[]
    hiringManagers: number[]
    recruiters: number[]
    approvers: number[]
    externalApprovers: number[]
    approveUntil: string | null
    approveMessage: string | null
    hardSkillsWeight: number
    softSkillsWeight: number
    languageSkillsWeight: number
    experienceWeight: number
    educationWeight: number
    shareSalary: boolean
    shareContact: boolean
}

export type UpdateData = StoreData & {
    keys: UpdateKey[]
}