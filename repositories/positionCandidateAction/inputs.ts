import type {ACTION_TYPE} from "~/types/enums";

export interface ActionBaseData {
    date: string | null
    timeStart: string | null
    timeEnd: string | null
    place: string | null
    interviewForm: string | null
    interviewType: string | null
    unavailable: boolean | null
    noShow: boolean | null
    testType: string | null
    instructions: string | null
    evaluation: string | null
    rejectedByCandidate: boolean | null
    rejectionReason: string | null
    refusalReason: string | null
    name: string | null
    offerJobTitle: string | null
    offerCompany: string | null
    offerEmploymentForms: string[] | null
    offerPlace: string | null
    offerSalary: number | null
    offerSalaryCurrency: string | null
    offerSalaryFrequency: string | null
    offerWorkload: string | null
    offerEmploymentRelationship: string | null
    offerStartDate: string | null
    offerEmploymentDuration: string | null
    offerCertainPeriodTo: string | null
    offerTrialPeriod: number | null
    offerCandidateNote: string | null
    realStartDate: string | null
    note: string | null
}

export interface ActionStoreData extends ActionBaseData {
    type: ACTION_TYPE | null
}

export interface ActionUpdateData extends ActionBaseData {}