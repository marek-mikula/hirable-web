export enum LANGUAGE {
    CS = 'cs',
    EN = 'en',
}

export enum ROLE {
    ADMIN = 'admin',
    USER = 'user',
}

export enum RESPONSE_CODE {
    SUCCESS = 'SUCCESS',
    CREATED = 'CREATED',
    CLIENT_ERROR = 'CLIENT_ERROR',
    TOKEN_MISMATCH = 'TOKEN_MISMATCH',
    EMAIL_VERIFICATION_NEEDED = 'EMAIL_VERIFICATION_NEEDED',
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
    DRIVING_LICENCE = 'driving_licence',
}

export enum POSITION_STATE {
    DRAFT = 'draft',
    OPENED = 'opened',
    CLOSED = 'closed',
    CANCELED = 'canceled',
}