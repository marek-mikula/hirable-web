export default defineI18nLocale(async () => {
    return {
        // COMMON
        common: {
            total: 'Total {n}',
            deleted: 'Deleted',
            copied: 'Copied!',
            loading: 'Loading',
            loadingData: 'Loading data',
            ai: {
                functions: 'AI functions',
                prompt: 'Prompt',
                use: 'This functionality uses AI.'
            },
            boolean: {
                yes: 'Yes',
                no: 'No',
            },
            action: {
                save: 'Save',
                delete: 'Delete',
                remove: 'Remove',
                update: 'Update',
                submit: 'Submit',
                cancel: 'Cancel',
                create: 'Create',
                new: 'New',
                add: 'Add',
                show: 'Show',
                showAll: 'Show all',
                download: 'Download',
                upload: 'Upload',
                uploadAgain: 'Upload again',
                ok: 'OK',
                confirm: 'Confirm',
                change: 'Change',
                backToLogin: 'Back to login',
                back: 'Back',
                continue: 'Continue',
                close: 'Close',
                understand: 'I understand',
                import: 'Import',
                select: 'Select',
                selectAll: 'Select all',
                edit: 'Edit',
                order: 'Order',
                invite: 'Invite',
                search: 'Search',
                refresh: 'Refresh',
                home: 'Home',
                open: 'Open',
                approve: 'Approve',
                reject: 'Reject',
                duplicate: 'Duplicate',
                share: 'Share',
                move: 'Move',
                hide: 'Hide',
                finish: 'Finish',
                evaluate: 'Evaluate',
            },
            datetime: {
                week: 'Week {n}',
                month: {
                    1: 'January',
                    2: 'February',
                    3: 'March',
                    4: 'April',
                    5: 'May',
                    6: 'June',
                    7: 'July',
                    8: 'August',
                    9: 'September',
                    10: 'October',
                    11: 'November',
                    12: 'December',
                },
            },
            table: {
                actions: 'Akce',
                loadingData: 'Loading data',
                empty: 'No data',
                noData: 'No data found. Try to change the filter or search query.',
                selected: 'Items selected',
                resultsNumber: '{from} to {to} of {total} results',
                previous: 'Previous',
                next: 'Next',
                search: 'Quick search',
            },
            gender: {
                m: 'Male',
                f: 'Female',
            },
            language: {
                cs: 'Czech',
                en: 'English',
            },
            error: 'Oops. Something went wrong. Please refresh the page. If the error persists, contact the support.'
        },

        // ERROR
        error: {
            title: {
                401: 'User not logged in',
                403: 'Access denied',
                404: 'Page not found',
                429: 'Too many requests',
                500: 'Server error',
                503: 'Maintenance in progress',
            },
            message: {
                401: 'You must be logged in to view this page.',
                403: 'You do not have sufficient rights to access this content.',
                404: 'The requested page was not found. It may have been deleted or the address is invalid.',
                429: 'You have sent too many requests in a short time. Please try again later.',
                500: 'An unexpected error occurred. We apologize for the inconvenience.',
                503: 'The server is undergoing maintenance. Please try again later.',
            },
            custom: {
                approve: {
                    invalidToken: {
                        title: 'Invalid link',
                        message: 'Your approval link is invalid. It has already been used before, or the approval process has been cancelled.',
                    }
                },
                apply: {
                    invalidToken: {
                        title: 'Invalid link',
                        message: 'The link to apply for the selection procedure is invalid. The position does not exist.',
                    },
                    applicationEnded: {
                        title: 'The selection procedure has ended',
                        message: 'The selection procedure for the position has already ended.',
                    }
                }
            }
        },

        // TOOLTIP
        tooltip: {
            common: {
                clipboard: 'Click to copy'
            },
            layout: {
                notifications: 'Notifications',
                markAllAsRead: 'Mark all as read',
                markAsRead: 'Mark as read',
                language: 'App language',
            },
            table: {
                settings: 'Table settings',
                refresh: 'Refresh data',
                sort: {
                    asc: 'Sort ascending',
                    description: 'Sort descending',
                    default: 'Cancel sorting'
                }
            },
            position: {
                cancelApproval: 'Cancels the approval process regardless of the approval status of individual approvers.',
                create: 'Creates the position as draft',
                open: 'Opens the position for recruitment',
                save: 'Saves the position in current state',
                sendForApproval: 'Sends the position for approval to selected approvers',
                states: {
                    draft: 'The position is in development and is awaiting completion or approval.',
                    approvalPending: 'Position pending approval by approver. It is not possible to edit the position at this time.',
                    approvalApproved: 'The position has been successfully approved by all approvers.',
                    approvalRejected: 'Some of the approvers rejected the position, thus canceling the entire approval process.',
                    approvalCancelled: 'The approval process has been cancelled.',
                    approvalExpired: 'Some of the approvers did not respond in time, thus canceling the approval process.',
                    opened: 'The position is open. You can actively create advertisements and recruit candidates for it.',
                    closed: 'The position is closed. Recruitment has already ended and the ideal candidate has been found.',
                    canceled: 'The position is canceled. You can no longer work with it.',
                },
                approval: 'Total approved / Total approvers',
                candidate: {
                    action: {
                        states: {
                            active: 'The action is active. Further activity is expected in the near future, e.g. meeting, evaluation, confirmation, etc.',
                            finished: 'The action is finished. No further activity is expected in the near future.',
                            canceled: 'The action has been canceled. No further activity is expected in the near future.',
                        },
                        operations: {
                            finish: 'The action will be created/saved as finished. No further activity is expected in the future, so its status will no longer be editable.',
                            cancel: 'The action will be saved as canceled. All interested parties will be notified. The status will no longer be editable.'
                        }
                    },
                    share: 'Sharing with hiring managers',
                    evaluations: 'Evaluations (filled/all)',
                    evaluationByUsers: 'Evaluation by users'
                }
            },
        },

        // MODEL
        model: {
            common: {
                id: 'ID',
                email: 'Email address',
                phone: 'Phone',
                phoneNumber: 'Phone number',
                phonePrefix: 'Phone prefix',
                name: 'Name',
                firstname: 'Firstname',
                lastname: 'Lastname',
                title: 'Name',
                description: 'Description',
                documents: 'Documents',
                document: 'Document',
                type: 'Type',
                role: 'Role',
                state: 'State',
                link: 'Link',
                linkedin: 'LinkedIn',
                github: 'Github',
                instagram: 'Instagram',
                portfolio: 'Portfolio/Personal web',
                createdAt: 'Created at',
                updatedAt: 'Updated at',
                deletedAt: 'Deleted at',
                createdBy: 'Created by',
                language: 'Language',
                communicationLanguage: 'Communication language',
                languageLevel: 'Language level',
                note: 'Note',
                owner: 'Owner',
                contact: 'Contact',
                file: 'File',
                tags: 'Tags',
                share: 'Share',
                gender: 'Gender',
                birthDate: 'Birth date',
            },
            candidate: {
                cv: 'Resume',
                otherFiles: 'Other files',
                sections: {
                    info: '📝 Basic information',
                    links: '🔗 Links',
                    experience: '💪 Experience',
                    other: '🗂️ Other',
                }
            },
            user: {
                password: 'Password',
                currentPassword: 'Current password',
                passwordConfirm: 'Password confirmation',
                newPassword: 'New password',
                prefix: 'Titles before name',
                postfix: 'Titles after name',
            },
            company: {
                name: 'Company name',
                idNumber: 'Company ID number',
                email: 'Company contact e-mail address',
                website: 'Company website',
                aiOutputLanguage: 'AI output language',
                roles: {
                    admin: 'Administrator',
                    recruiter: 'Recruiter',
                    hiringManager: 'Hiring Manager',
                }
            },
            token: {
                validUntil: 'Expiration date',
                usedAt: 'Used at',
                states: {
                    active: 'Active',
                    expired: 'Expired',
                    used: 'Used'
                }
            },
            position: {
                name: 'Position name',
                externName: 'Extern position name',
                approveUntil: 'Approve until',
                approveMessage: 'Message for approvers',
                department: 'Department',
                field: 'Field',
                workload: 'Work load',
                employmentRelationship: 'Employment relationship',
                employmentForm: 'Form of cooperation',
                jobSeatsNum: 'Number of job seats',
                description: 'Description',
                address: 'Workplace address',
                salarySpan: 'Salary range from - to',
                salaryFrom: 'Salary from',
                salaryTo: 'Salary to',
                salary: 'Salary',
                salaryType: 'Salary type',
                salaryFrequency: 'Salary frequency',
                salaryCurrency: 'Currency',
                salaryVar: 'Variable component',
                benefits: 'Benefits',
                minEducationLevel: 'Minimum education level',
                educationField: 'Education field',
                seniority: 'Seniority',
                experience: 'Min. number of years worked',
                hardSkills: 'Other hard skills',
                note: 'Note',
                files: 'Files',
                organisationSkills: 'Organisational skills',
                teamSkills: 'Teamwork',
                timeManagement: 'Time management',
                communicationSkills: 'Communication skills',
                leadership: 'Leading people',
                languageSkills: 'Language skills',
                hiringManagers: 'Hiring managers',
                recruiters: 'Recruiters',
                approvers: 'Approvers',
                externalApprovers: 'External approvers',
                hardSkillsWeight: 'Hard skills weight',
                softSkillsWeight: 'Soft skills weight',
                languageSkillsWeight: 'Language skills weight',
                experienceWeight: 'Work experience weight',
                educationWeight: 'Education weight',
                shareSalary: 'Share salary',
                shareContact: 'Share contact',
                commonLink: 'General link',
                internLink: 'Intern link',
                referralLink: 'Referral link',
                roles: {
                    hiringManager: 'Hiring manager',
                    approver: 'Approver',
                    externalApprover: 'External approver',
                },
                states: {
                    draft: 'Draft',
                    approvalPending: 'Pending approval',
                    approvalApproved: 'Approved',
                    approvalRejected: 'Approval rejected',
                    approvalCanceled: 'Approval canceled',
                    approvalExpired: 'Approval expired',
                    opened: 'Opened',
                    closed: 'Closed',
                    canceled: 'Canceled',
                },
                sections: {
                    info: '📝 Basic information',
                    offer: '💰 Offer',
                    hardSkills: '💪 Hard skills',
                    softSkills: {
                        title: '🤝 Soft skills',
                        subtitle: 'Select the level of soft skills needed to perform the position - 0 = it doesn\'t matter at all, 100 = it is very important.'
                    },
                    languageSkills: {
                        title: '🗣️ Language skills',
                        subtitle: 'To add language skills, first select the desired language, then the language level, and click the "Add" button.'
                    },
                    other: '🗂️ Other',
                    recruitment: {
                        title: '📢 Recruitment',
                        subtitle: 'Attributes influencing the recruitment process.'
                    },
                    roles: '👤 Roles',
                    approval: '👍 Approval',
                    share: {
                        title: '🔗 Sharing',
                        subtitle: 'Attributes affecting sharing of position information outside the system.',
                    }
                },
            },
            positionApproval: {
                round: 'Round',
                decidedAt: 'Decided at',
                remindedAt: 'Reminded at',
                states: {
                    pending: 'Waiting for approval',
                    approved: 'Approved',
                    rejected: 'Rejected',
                    canceled: 'Canceled',
                    expired: 'Expired',
                }
            },
            processStep: {
                step: 'Step',
                isRepeatable: 'Repeatable',
                triggersAction: 'Triggers action',
                steps: {
                    new: 'New candidates',
                    screening: 'Screening',
                    shortlist: 'Shortlist',
                    offer: 'Offer',
                    placement: 'Placement',
                    rejected: 'Rejected',
                    interview: 'Interview',
                    task: 'Task',
                    assessmentCenter: 'Assessment center',
                },
            },
            positionCandidate: {
                score: 'AI Candidate score',
                actions: 'Actions',
                evaluations: 'Evaluations',
                waitingEvaluation: 'Waiting evaluation',
                scoreCategories: {
                    hardSkills: 'Hard skills',
                    softSkills: 'Soft skills',
                    languageSkills: 'Language skills',
                    education: 'Education',
                    experience: 'Working experience',
                },
                otherActions: {
                    share: '📤 Share with hiring managers',
                    evaluate: '⭐ Evaluate',
                    requestEvaluation: '🙏 Request evaluation',
                },
            },
            positionCandidateShare: {
                creator: 'Shared by user'
            },
            positionCandidateEvaluation: {
                creator: 'Requested by user',
                hiringManagers: 'Hiring managers',
                fillUntil: 'Fill until',
                evaluation: 'Verbal evaluation',
                stars: 'Evaluation',
                states: {
                    waiting: 'Waiting',
                    filled: 'Filled',
                }
            },
            positionCandidateAction: {
                date: 'Date',
                timeStart: 'Time from',
                timeEnd: 'Time to',
                place: 'Venue',
                instructions: 'Instructions',
                evaluation: 'Verbal evaluation',
                name: 'Own action name',
                interviewForm: 'Interview form',
                interviewType: 'Interview type',
                interviewResult: 'Interview result',
                assessmentCenterResult: 'Assessment center result',
                rejectedByCandidate: 'Rejected by the candidate',
                reason: 'Reason',
                taskType: 'Task type',
                taskResult: 'Task result',
                offerState: 'Offer status',
                offerJobTitle: 'Job title',
                offerCompany: 'Company',
                offerEmploymentForms: 'Form of cooperation',
                offerPlace: 'Place of work',
                offerSalary: 'Salary',
                offerSalaryCurrency: 'Salary currency',
                offerSalaryFrequency: 'Salary frequency',
                offerWorkload: 'Work load',
                offerEmploymentRelationship: 'Employment relationship',
                offerStartDate: 'Start date',
                offerEmploymentDuration: 'Employment duration',
                offerCertainPeriodTo: 'Certain period to',
                offerTrialPeriod: 'Trial period',
                offerCandidateNote: 'Note to candidate',
                realStartDate: 'Real start date',
                note: 'Internal note',
                interviewResults: {
                    unavailable: 'Unavailable',
                    noShow: 'Not showed',
                    excused: 'Excused',
                    ok: 'Ok',
                    other: 'Other',
                },
                assessmentCenterResults: {
                    noShow: 'Not showed',
                    excused: 'Excused',
                    ok: 'Ok',
                    other: 'Other',
                },
                offerStates: {
                    waiting: 'Waiting',
                    accepted: 'Accepted',
                    rejected: 'Rejected',
                },
                taskResults: {
                    notParticipated: 'Not Submitted',
                    passedExceptionally: 'Passed exceptionally',
                    passed: 'Passed',
                    passedWithExceptions: 'Passed with exceptions',
                    failed: 'Failed',
                    invalid: 'Invalid result',
                    other: 'Other',
                },
                types: {
                    interview: '💬 Interview',
                    task: '✅ Task',
                    assessmentCenter: '🏢 Assessment center',
                    offer: '🤝 Offer',
                    communication: '✉ Communication',
                    rejection: '❌ Rejection',
                    custom: '⚙️ Custom',
                    startOfWork: '💼 Start of work',
                },
                states: {
                    active: 'Active',
                    finished: 'Finished',
                    canceled: 'Canceled',
                }
            }
        },

        // FORM
        form: {
            required: 'Mandatory information',
            hint: {
                common: {
                    url: 'Please enter a valid URL including the protocol (https:// or http://).',
                    suggest: 'Previously used values are automatically recommended to you.',
                    phoneNumber: 'Enter a phone number without spaces and area code.'
                },
                user: {
                    password: 'Password must be at least 8 characters long and contains at least 1 capital letter, 1 special character and 1 number.',
                },
                position: {
                    description: 'A detailed job description will enhance all elements of artificial intelligence throughout the entire recruitment process.',
                    externalApprovers: 'To assign an external approver, you must first create a contact.',
                    approveUntil: 'If approval is not received by the selected date, the approval process will be canceled automatically.',
                    approveMessage: 'The message will be sent in the approval email to the approvers.',
                    externName: 'The external position name will be used wherever information will be shared outside the system (e.g. candidate registration form, sharing the position on advertising portals).',
                    shareSalary: 'If checked, the salary will be shared with the candidate through the registration form and job portals (if supported).',
                    shareContact: 'If checked, the contact to the position owner will be shared with the candidate through the registration form and job portals (if supported).',
                    candidate: {
                        evaluation: {
                            fillUntil: 'The hiring manager must complete the evaluation by this date. If they do not complete it, they will receive a reminder every day.'
                        }
                    }
                },
                processStep: {
                    isRepeatable: 'Check if this step can repeat within the process (e.g., multiple interview rounds). Do not check if it occurs only once.',
                },
                positionProcessStep: {
                    label: 'If you leave the field blank, the original step name will be used.'
                }
            },
            help: {
                position: {
                    hardSkillsWeight: 'The weight determines the importance of hard skills in AI\'s assessment of candidate suitability for the position (0 = not important, 100 = important).',
                    softSkillsWeight: 'The weight determines the importance of soft skills in AI\'s assessment of candidate suitability for the position (0 = not important, 100 = important).',
                    languageSkillsWeight: 'The weight determines the importance of language skills in AI\'s assessment of candidate suitability for the position (0 = not important, 100 = important).',
                    experienceWeight: 'The weight determines the importance of work experience in AI\'s assessment of candidate suitability for the position (0 = not important, 100 = important).',
                    educationWeight: 'The weight determines the importance of education in AI\'s assessment of candidate suitability for the position (0 = not important, 100 = important).',
                },
                company: {
                    aiOutputLanguage: 'Language is used for static AI-generated texts (e.g. candidate evaluations).'
                },
                processSteps: 'Used to set custom position process steps.',
            },
            select: {
                chooseOption: 'Choose an option',
                chooseOptions: 'Choose options',
                unselectAll: 'Unselect all',
                noOptions: 'No options',
                noOptionsQuery: 'No results for "{q}"',
                search: 'Search',
                searchMin: 'Search (min. characters: {n})',
                create: 'Create "{item}"',
                numSelectedOptions: 'Number of selected options'
            },
            tags: {
                placeholder: 'Keyword',
                empty: 'Click to enter keywords'
            },
            suggest: {
                noSuggestions: 'No suggestions'
            },
            fileUpload: {
                clickOrDrag: 'Click or drag and drop',
                select: 'Select a file'
            },
        },

        // LAYOUT
        layout: {
            notifications: {
                title: 'Notifications',
                empty: 'No notifications yet.'
            },
            navbar: {
                search: {
                    placeholder: 'Search...'
                },
            },
            menu: {
                footer: 'made with 💙',
                main: 'Main menu',
                settings: 'Settings',
                logout: 'Sign out',
                create: {
                    title: 'Create',
                    position: 'Create position',
                },
            }
        },

        // COMPONENT
        component: {
            candidate: {
                score: {
                    comment: '💬 Comment',
                    info: 'Detailed score can be found on the detail of candidate on position. The score is indicative and is not intended to serve as a full evaluation of the candidate.'
                }
            }
        },

        // PAGE
        page: {
            apply: {
                positionDetail: 'Position detail',
                message: 'Hello, we appreciate your interest in the job offer. Below you will find detailed information about the position and a contact form for inclusion in the selection process. Good luck!',
            },
            applySuccess: {
                title: 'Application submitted',
                message: 'Your application has been successfully submitted. Thank you. We will contact you shortly.',
            },
            dashboard: {
                title: 'Dashboard'
            },
            candidate: {
                title: 'Candidates',
                detail: {
                    tabs: {
                        detail: 'Detail',
                        positions: 'Positions',
                        communication: 'Communication',
                        history: 'History',
                        evaluation: 'Evaluation',
                    }
                }
            },
            position: {
                title: 'Positions',
                create: {
                    title: 'Create position',
                    subtitle: 'The position is an internal entity and the information filled in will not be shared with the candidate unless you explicitly allow it in the Sharing section.',
                    fillFromPrompt: 'Fill from prompt',
                    fillFromFile: 'Fill from file',
                    placeholder: {
                        description: 'Describe the main responsibilities, job description, team and work environment.',
                        hardSkills: 'Describe other hard skills, certifications, programming languages, courses taken, etc.'
                    },
                    sendForApproval: 'Send for approval',
                    cancelApproval: 'Cancel approval',
                    usePositionName: 'Use position name',
                },
                detail: {
                    tabs: {
                        detail: 'Detail',
                        candidates: 'Candidates',
                        advertisements: 'Advertisements',
                        statistics: 'Statistics'
                    },
                    candidates: {
                        kanban: {
                            hideEmpty: 'Hide empty columns',
                            settings: 'Kanban table settings',
                            columnSettings: 'Column settings'
                        }
                    }
                },
                approve: {
                    title: 'Position approval'
                },
            },
            search: {
                title: 'Searching "{query}"'
            },
            login: {
                title: 'Login',
                notAMember: 'Not a member?',
                createAnAccount: 'Create an account!',
                rememberMe: 'Remember me',
                forgotPassword: 'Forgotten password',
                signIn: 'Sign in'
            },
            registerRequest: {
                title: 'Create an account',
                subtitle: 'Please enter your email address and we will send you a link to complete your registration.',
                requestRegistration: 'Request registration'
            },
            register: {
                title: 'Finish registration',
                subtitle: 'To finish your registration, please, tell us something about you and your company.',
                gdpr: {
                    text: 'By clicking the "Register" button, you agree to the {gdprButton} and {termsButton}.',
                    gdprButton: 'GDPR',
                    termsButton: 'Terms and Conditions',
                },
                submit: 'Register'
            },
            invitation: {
                title: 'Application invitation',
                subtitle: 'Someone invited you to our application. To complete the registration, please tell us a little about yourself.',
            },
            forgottenPassword: {
                title: 'Forgotten password',
                subtitle: 'Enter the email address to which your account is registered. If the account exists, we will send you a link to set a new password.',
                submit: 'Send password reset link'
            },
            resetPassword: {
                title: 'Reset password',
                submit: 'Reset password',
            },
            company: {
                title: 'Company',
                information: {
                    title: 'Informace',
                    basic: {
                        title: 'Basic information'
                    }
                },
                invitations: {
                    title: 'Invitations'
                },
                users: {
                    title: 'Users'
                },
                contacts: {
                    title: 'Contacts'
                },
                settings: {
                    title: 'Settings',
                    ai: {
                        title: 'AI settings'
                    },
                    positionProcess: {
                        title: 'Position process',
                        steps: 'Process steps',
                        empty: 'No process steps',
                        processStepInfo: 'All changes to process steps (delete/edit/create) will not affect already opened positions. Editing of process steps for open positions must be done on the "Candidates" tab in the position detail.'
                    }
                }
            },
            profile: {
                title: 'Profile',
                information: {
                    title: 'Information',
                    personal: {
                        title: 'Personal information'
                    },
                },
                settings: {
                    title: 'Settings',
                    language: {
                        title: 'Language settings',
                    },
                },
                privacy: {
                    title: 'Password & privacy',
                    password: {
                        title: 'Password settings',
                    },
                },
            }
        },

        // TOAST
        toast: {
            file: {
                delete: 'File was successfully deleted.'
            },
            candidate: {
                edit: 'Candidate successfully edited.',
            },
            processStep: {
                store: 'Process step successfully created.',
                update: 'Process step successfully updated.',
                delete: 'Process step successfully deleted.',
            },
            apply: {
                duplicate: 'We are already registering your application for this position with the email or phone number you provided.'
            },
            position: {
                fillFromPrompt: 'Position attributes were successfully filled in as specified by prompt.',
                fillFromFile: 'Position attributes were successfully filled in as specified by file.',
                duplicate: 'Position duplicated successfully.',
                approvalCanceled: 'The position approval process has been successfully canceled.',
                create: 'Position created successfully.',
                open: 'Position opened successfully.',
                save: 'Position saved successfully.',
                edit: 'Position updated successfully.',
                approve: 'Position approved successfully.',
                reject: 'Position rejected successfully.',
                delete: 'Position deleted successfully.',
                sendForApproval: 'Position successfully sent for approval.',
                kanban: {
                    setStep: 'Candidate successfully moved to step {step}.'
                },
                candidate: {
                    action: {
                        store: 'Action successfully created.',
                        update: 'Action successfully updated.',
                        actionExists: 'The action could not be created because the same action already exists and is not canceled.',
                        notSufficientStep: 'This action cannot be created in the step the candidate is in.'
                    },
                    share: {
                        store: 'Candidate has been successfully shared with selected hiring managers.',
                        delete: 'The candidate is no longer shared with the selected user.',
                    },
                    evaluation: {
                        store: 'Candidate evaluation was successfully created.',
                        update: 'Candidate evaluation was successfully updated.',
                        request: 'Candidate evaluation was successfully requested.',
                        delete: 'Candidate evaluation was successfully deleted.',
                    }
                },
                processStep: {
                    delete: 'Position process step successfully removed.',
                    store: {
                        success: 'Position process step successfully added.',
                        exists: 'Position process step already exists and is not repeatable.',
                    },
                    update: 'Position process step successfully updated.',
                    setOrder: 'Process step order has been successfully updated.',
                }
            },
            common: {
                unauthenticated: 'Your session has expired. Please log in again.',
                unauthorized: 'You are not authorized to perform this action.',
                guest: 'You cannot access that resource while logged in. You have been automatically redirected to the application.',
                tooManyRequests: 'Too many requests. Please try again later.',
                formErrors: 'The form contains some errors.',
                error: 'Oops. Something went wrong. Please try again or contact the support at <a href="mailto:{email}" class="text-primary-600 hover:text-primary-500 hover:underline">{email}</a>, if the problem persists.',
                fileUpload: {
                    tooManyFiles: 'File {name} could not have been uploaded. The maximum number of files is {max}.',
                    fileTooBig: 'File {name} could not have been uploaded. The maximum size of a file is {max}.',
                },
                copiedToClipboard: 'Copied to clipboard!'
            },
            registerRequest: {
                success: 'We have successfully sent you a registration link.',
                notReachable: 'The registration email could not be sent to the specified email address.',
                alreadyRequested: 'You have already requested a registration for this email address. You can request the registration only once in 15 minutes.'
            },
            languageChange: 'Language has been successfully changed.',
            company: {
                update: 'Company details have been successfully updated.',
                invitation: {
                    delete: 'Invitation was successfully deleted.',
                    store: {
                        success: 'The invitation was created successfully.',
                        exists: 'An invitation with this email address already exists.',
                        userExists: 'A user with this email already exists in the system.'
                    }
                },
                contact: {
                    store: 'Contact was successfully created.',
                    update: 'Contact was successfully updated.',
                    delete: {
                        success: 'Contact was successfully deleted.',
                        pendingApprovals: 'The contact cannot be deleted because they are involved in the approval process for positions: {positions}.'
                    },
                }
            },
            profile: {
                language: {
                    success: 'Language settings has been successfully updated.'
                },
                personal: {
                    success: 'Personal settings has been successfully updated.'
                },
                password: {
                    success: 'Password has been successfully changed.',
                    samePassword: 'New password must not match your current password.'
                }
            },
            logout: 'You have been successfully logged out.',
            passwordReset: {
                linkInvalid: 'Password reset link is invalid.',
                success: 'Password was successfully reset. You can now log in.',
            },
            register: {
                linkInvalid: 'Registration link is invalid.',
                success: 'Registration was successful.',
            },
            forgottenPassword: {
                success: 'If the email address exists, we have sent you a link to reset your password.',
                alreadyRequested: 'You have already requested a reset for this email address. You can request the reset only once in 15 minutes.'
            },
            login: {
                success: 'Successfully logged in.',
                invalidCredentials: 'Given credentials do not match!',
                verificationNeeded: 'You need to verify your email first!',
            },
            grid: {
                updateColumnWidth: 'Column width saved successfully.',
                resetSettings: 'Table setting was successfully reset.',
                updateSettings: 'Table setting was successfully updated.'
            },
            notification: {
                markRead: 'Notification has been successfully marked as read.',
                markAllRead: 'Notifications have been successfully marked as read.',
            }
        },

        // MODAL
        modal: {
            processStep: {
                store: {
                    title: 'New process step'
                },
                update: {
                    title: 'Update process step'
                },
                delete: {
                    title: 'Delete Process Step',
                    text: 'Are you sure you want to delete the process step? Positions that use this step will continue to use the process step. New positions will no longer see this step.',
                }
            },
            apply: {
                confirm: {
                    title: 'Contact details check',
                    text: 'Please check the key contact data entered to make sure it is correct.',
                }
            },
            company: {
                deleteInvitation: {
                    title: 'Delete invitation',
                    text: 'You are about to delete the selected invitation. Are you sure? The action is irreversible.'
                },
                deleteContact: {
                    title: 'Delete contact',
                    text: 'You are about to delete the selected contact. Are you sure? The action is irreversible. The contact will be removed from all places where it is used.'
                },
                updateContact: {
                    title: 'Update contact'
                },
                storeContact: {
                    title: 'Create contact'
                },
                invite: {
                    title: 'Invite user'
                }
            },
            grid: {
                settings: {
                    title: 'Table settings',
                    columns: 'Columns',
                    stickyHeader: 'Floating Table Header',
                    stickyHeaderHint: 'If checked, the table header will scroll when the content is scrolled.',
                    stickyFooter: 'Floating table footer',
                    stickyFooterHint: 'If checked, the footer of the table will move when the content is scrolled.',
                    perPage: 'Number of results per page',
                    resetDefault: 'Reset default'
                },
                filter: {
                    title: 'Filter',
                    reset: 'Reset',
                }
            },
            fileDelete: {
                title: 'File Delete',
                text: 'Are you sure you want to delete the file {file}?'
            },
            candidate: {
                edit: {
                    title: 'Edit candidate',
                },
            },
            position: {
                delete: {
                    title: 'Delete Position',
                    text: 'Are you sure you want to delete this position? This action cannot be undone.'
                },
                approvalHistory: {
                    title: 'Approval history',
                },
                edit: {
                    title: 'Upravit pozici',
                },
                cancelApproval: {
                    title: 'Cancel Approval',
                    text: 'Are you sure you want to cancel the approval process? Approvers, who have already decided or received an approval email, will be notified that the approval process has been canceled.'
                },
                approve: {
                    title: 'Accept position'
                },
                reject: {
                    title: 'Reject position'
                },
                externalApprovers: {
                    title: 'External Approvers',
                    text: 'You are about to send the position to external approvers. Are you sure you want to send the position to these people for approval?'
                },
                processStep: {
                    store: {
                        title: 'Add process step',
                    },
                    update: {
                        title: 'Update process step',
                    },
                    setOrder: {
                        title: 'Process step order',
                        order: 'Order of columns',
                    },
                    delete: {
                        title: 'Delete position process step',
                        text: 'Are you sure you want to delete the position process step?',
                        removeCandidates: 'To remove the position process step, you need to move all candidates to another position process step.'
                    },
                },
                candidate: {
                    action: {
                        create: {
                            candidates: 'Candidates',
                        },
                        finish: {
                            title: 'Finish action',
                            text: 'Are you sure you want to finish the action? You won\'t be able to change the state afterwards.',
                        },
                        cancel: {
                            title: 'Cancel action',
                            text: 'Are you sure you want to cancel the action? You won\'t be able to change the state afterwards.',
                        },
                    },
                    detail: {
                        title: 'Candidate {candidate} on position {position}'
                    }
                }
            }
        },

        // NOTIFICATIONS
        notification: {
            invitation: {
                accepted: {
                    title: 'Invitation accepted',
                    message: 'Your invitation to the system has been accepted by {userName}.',
                },
            },
            position: {
                assigned_as_recruiter: {
                    title: 'Assigned as recruiter',
                    message: 'You have been assigned as a recruiter to the position {positionName}.'
                },
                assigned_as_hm: {
                    title: 'Assigned as hiring manager',
                    message: 'You have been assigned as a hiring manager to the position {positionName}.'
                },
                removed_as_recruiter: {
                    title: 'Removal as recruiter',
                    message: 'You have been removed as a recruiter from position {positionName}.'
                },
                removed_as_hm: {
                    title: 'Removal as hiring Manager',
                    message: 'You have been removed as a hiring manager from position {positionName}.'
                },
                opened: {
                    title: 'Position Opened',
                    message: 'Position {positionName} has been opened for recruitment.',
                },
                approval: {
                    title: 'Position for Approval',
                    message: 'You have been assigned as an approver for position {positionName}.',
                },
                approval_rejected: {
                    title: 'Position Rejected',
                    message: '{rejectedByName} has rejected position {positionName}.',
                },
                approval_approved: {
                    title: 'Position approved',
                    message: 'Position {positionName} has been successfully approved.',
                },
                approval_expired: {
                    title: 'Approval process expired',
                    message: 'The approval process for position {positionName} has expired.',
                },
                approval_canceled: {
                    title: 'Approval process canceled',
                    message: 'The approval process for position {positionName} has been canceled.',
                },
                approval_reminder: {
                    title: 'Position awaiting comment',
                    message: 'Position {positionName} is awaiting your comment in the approval process.',
                },
                new_candidate: {
                    title: 'New candidate for position',
                    message: 'A new candidate {candidateName} has applied for the position {positionName}.'
                }
            },
            position_candidate: {
                shared: {
                    title: 'Sharing a candidate',
                    message: 'Candidate {candidateName} has been shared with you for the position {positionName}.',
                },
                share_stopped: {
                    title: 'Candidate sharing stopped',
                    message: 'Candidate {candidateName} has been stopped for the position {positionName}.',
                }
            }
        }
    }
})