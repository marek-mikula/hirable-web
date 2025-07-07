export enum LANGUAGE {
    CS = 'cs',
    EN = 'en',
}

export enum ROLE {
    ADMIN = 'admin',
    RECRUITER = 'recruiter',
    HIRING_MANAGER = 'hiringManager',
}

export enum RESPONSE_CODE {
    SUCCESS = 'SUCCESS',
    CREATED = 'CREATED',
    CLIENT_ERROR = 'CLIENT_ERROR',
    TOKEN_MISMATCH = 'TOKEN_MISMATCH',
    EMAIL_VERIFICATION_NEEDED = 'EMAIL_VERIFICATION_NEEDED',
    CONTACT_PENDING_APPROVALS = 'CONTACT_PENDING_APPROVALS',
    UNAUTHORIZED = 'UNAUTHORIZED',
    TOKEN_MISSING = 'TOKEN_MISSING',
    TOKEN_CORRUPTED = 'TOKEN_CORRUPTED',
    TOKEN_INVALID = 'TOKEN_INVALID',
    GUEST_ONLY = 'GUEST_ONLY',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    NOT_FOUND = 'NOT_FOUND',
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    INVALID_CONTENT = 'INVALID_CONTENT',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    INVITATION_EXISTS = 'INVITATION_EXISTS',
    INVITATION_USER_EXISTS = 'INVITATION_USER_EXISTS',
    TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
    REGISTRATION_ALREADY_REQUESTED = 'REGISTRATION_ALREADY_REQUESTED',
    RESET_ALREADY_REQUESTED = 'RESET_ALREADY_REQUESTED',
    SERVER_ERROR = 'SERVER_ERROR',
}

export enum FILE_TYPE {
    TEMP = 'temp',
}

export enum GRID {
    CANDIDATE = 'candidate',
    COMPANY_INVITATION = 'company-invitation',
    COMPANY_CONTACT = 'company-contact',
    COMPANY_USER = 'company-user',
    POSITION = 'position'
}

export enum ORDER {
    ASC = 'asc',
    DESC = 'desc'
}

export enum CLASSIFIER_TYPE {
    GENDER = 'gender',
    CURRENCY = 'currency',
    LANGUAGE = 'language',
    LANGUAGE_LEVEL = 'language_level',
    BENEFIT = 'benefit',
    WORKLOAD = 'workload',
    EMPLOYMENT_RELATIONSHIP = 'employment_relationship',
    EMPLOYMENT_FORM = 'employment_form',
    SENIORITY = 'seniority',
    EDUCATION_LEVEL = 'education_level',
    FIELD = 'field',
    PHONE_PREFIX = 'phone_prefix',
    INTERVIEW_TYPE = 'interview_type',
    TEST_TYPE = 'test_type',
    REFUSAL_TYPE = 'refusal_type',
    REJECTION_TYPE = 'rejection_type',
    SALARY_FREQUENCY = 'salary_frequency',
    SALARY_TYPE = 'salary_type',
}

export enum POSITION_STATE {
    DRAFT = 'draft',
    APPROVAL_PENDING = 'approvalPending',
    APPROVAL_APPROVED = 'approvalApproved',
    APPROVAL_REJECTED = 'approvalRejected',
    APPROVAL_CANCELED = 'approvalCanceled',
    APPROVAL_EXPIRED = 'approvalExpired',
    OPENED = 'opened',
    CLOSED = 'closed',
    CANCELED = 'canceled',
}

export enum POSITION_APPROVAL_STATE {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    CANCELED = 'canceled',
    EXPIRED = 'expired',
}

export enum POSITION_ROLE {
    HIRING_MANAGER = 'hiringManager',
    RECRUITER = 'recruiter',
    APPROVER = 'approver',
    EXTERNAL_APPROVER = 'externalApprover',
}

export enum POSITION_DETAIL_TAB {
    DETAIL = 'detail',
    CANDIDATES = 'candidates',
    ADVERTISEMENTS = 'advertisements',
    STATISTICS = 'statistics'
}

export enum POSITION_SECTION {
    INFO = 'info',
    ROLES = 'roles',
    APPROVAL = 'approval',
    OFFER = 'offer',
    HARD_SKILLS = 'hardSkills',
    SOFT_SKILLS = 'softSkills',
    LANGUAGE_SKILLS = 'languageSkills',
    RECRUITMENT = 'recruitment',
    OTHER = 'other',
    SHARE = 'share',
}

export enum NOTIFICATION_TYPE {
    REGISTER_REQUEST = 'register:request',
    REGISTER_REGISTERED = 'register:registered',
    VERIFICATION_VERIFY_EMAIL = 'verification:verify_email',
    VERIFICATION_EMAIL_VERIFIED = 'verification:email_verified',
    PASSWORD_RESET_REQUEST = 'password:reset_request',
    PASSWORD_CHANGED = 'password:changed',
    INVITATION_SENT = 'invitation:sent',
    INVITATION_ACCEPTED = 'invitation:accepted',
    POSITION_OPENED = 'position:opened',
    POSITION_APPROVAL = 'position:approval',
    POSITION_APPROVAL_REJECTED = 'position:approval_rejected',
    POSITION_APPROVAL_APPROVED = 'position:approval_approved',
    POSITION_APPROVAL_EXPIRED = 'position:approval_expired',
    POSITION_APPROVAL_CANCELED = 'position:approval_canceled',
    POSITION_APPROVAL_REMINDER = 'position:approval_reminder',
    POSITION_ASSIGNED_AS_RECRUITER = 'position:assigned_as_recruiter',
    POSITION_ASSIGNED_AS_HM = 'position:assigned_as_hm',
    POSITION_REMOVED_AS_RECRUITER = 'position:removed_as_recruiter',
    POSITION_REMOVED_AS_HM = 'position:removed_as_hm',
}