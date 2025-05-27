export default defineI18nLocale(async () => {
    return {
        // COMMON
        common: {
            copied: 'Copied!',
            loading: 'Loading',
            loadingData: 'Loading data',
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
                choose: 'Choose',
                edit: 'Edit',
                order: 'Order',
                invite: 'Invite',
                search: 'Search',
                refresh: 'Refresh',
                home: 'Home'
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
                loadingData: 'Loading data',
                noData: 'No data found. Try to change the filter or search query.',
                selected: 'Items selected',
                resultsNumber: '{from} to {to} of {total} results',
                previous: 'Previous',
                next: 'Next',
                search: 'Search in table',
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
            }
        },

        // TOOLTIP
        tooltip: {
            layout: {
                notifications: 'Notifications',
                language: 'App language',
            },
            table: {
                settings: 'Table settings',
                sort: {
                    asc: 'Sort ascending',
                    description: 'Sort descending',
                    default: 'Cancel sorting'
                }
            },
            position: {
                create: {
                    save: 'Saves position as work in progress',
                }
            }
        },

        // MODEL
        model: {
            common: {
                id: 'ID',
                email: 'Email address',
                phone: 'Phone number',
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
                createdAt: 'Created at',
                updatedAt: 'Updated at',
                deletedAt: 'Deleted at',
                createdBy: 'Created by',
                language: 'Language',
                languageLevel: 'Language level'
            },
            user: {
                timezone: 'Timezone',
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
                environment: 'Working environment',
                benefits: 'Benefits',
                roles: {
                    admin: 'Administrator',
                    user: 'User',
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
                department: 'Department',
                field: 'Field',
                workload: 'Work load',
                employmentRelationship: 'Employment relationship',
                employmentForm: 'Form of cooperation',
                jobSeatsNum: 'Number of job seats',
                description: 'Description',
                isTechnical: 'Technical position',
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
                seniority: 'Seniority',
                experience: 'Min. number of years worked',
                note: 'Note',
                files: 'Files',
                drivingLicence: 'Driving licence',
                organisationSkills: 'Organisational skills',
                teamSkills: 'Teamwork',
                timeManagement: 'Time management',
                communicationSkills: 'Communication skills',
                leadership: 'Leading people',
            }
        },

        // FORM
        form: {
            hint: {
                common: {
                    url: 'Please enter a valid URL including the protocol (https:// or http://).'
                },
                user: {
                    password: 'Password must be at least 8 characters long and contains at least 1 capital letter, 1 special character and 1 number.',
                    timezone: 'If no timezone is set, the timezone is calculated from your browser or default timezone is used.'
                },
                token: {
                    verificationCode: 'Please provide your secret code from email to verify that it\'s really you.'
                },
                company: {
                    profile: {
                        environment: {
                            benefits: 'The selected benefits will be pre-selected in the form when creating a position.'
                        }
                    }
                },
                position: {
                    description: 'A detailed job description will enhance all elements of artificial intelligence throughout the entire recruitment process.',
                    department: 'Previously used values are automatically recommended to you.',
                    isTechnical: 'If checked, additional field specific to technical positions will become visible - Seniority',
                }
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
            navbar: {
                search: {
                    placeholder: 'Search...'
                },
            },
            menu: {
                main: 'Main menu',
                settings: 'Settings',
                logout: 'Sign out',
                create: {
                    title: 'Create',
                    position: 'Create position',
                    advertisement: 'Create advertisement',
                },
            }
        },

        // PAGE
        page: {
            dashboard: {
                title: 'Dashboard'
            },
            candidates: {
                title: 'Candidates'
            },
            positions: {
                title: 'Positions',
                create: {
                    title: 'Create position',
                    subtitle: 'The position is an internal entity and the information filled in will not be shared with the candidate unless you explicitly allow it when creating the ad.',
                    fromPrompt: 'Create from prompt (AI)',
                    fromFile: 'Create from file (AI)',
                    sections: {
                        basicInfo: '📝 Basic information',
                        place: '📍 Place of work',
                        offer: '💰 Offer',
                        hardSkills: '💪 Hard skills',
                        softSkills: {
                            title: '🤝 Soft skills',
                            subtitle: 'Select the level of soft skills needed to perform the position - 0 = it doesn\'t matter at all, 10 = it is very important.'
                        },
                        languageSkills: {
                            title: '🗣️ Language skills',
                            subtitle: 'To add language skills, first select the desired language, then the language level, and click the "Add" button.'
                        },
                        other: {
                            title: '🗂️ Other',
                            subtitle: 'Space for internal information.'
                        }
                    },
                    placeholder: {
                        description: 'Briefly describe the main responsibilities, technologies or tools the candidate will work with, required certificates, and what you expect from them.'
                    }
                }
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
                    },
                    environment: {
                        description: 'A detailed description of the working environment at your company will help the application better assess how the candidate will fit into your company.',
                        placeholder: 'The mood in our company is informal, we have pet-friendly offices, we often go to brunch, ...'
                    }
                },
                settings: {
                    title: 'Settings',
                },
                invitations: {
                    title: 'Invitations'
                },
                users: {
                    title: 'Users'
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
                    timezone: {
                        title: 'Timezone settings',
                        subtitle: 'The time zone affects the time offset from UTC time.',
                    },
                },
                notifications: {
                    title: 'Notifications',
                    application: {
                        title: 'Application notifications',
                        subtitle: 'Notifications about application activity.',
                    },
                    marketing: {
                        title: 'Marketing notifications',
                        subtitle: 'Notifications about marketing deals, sales, offers etc.',
                    },
                    technical: {
                        title: 'Technical notifications',
                        subtitle: 'Notifications about new updates, changes and outages in the application.',
                    },
                    types: {
                        app: {
                            label: 'App',
                            hint: 'In-app notifications which appear in the notifications sidebar on the right side of the application.'
                        },
                        mail: {
                            label: 'Mail',
                            hint: 'E-mail notifications'
                        },
                    }
                },
                privacy: {
                    title: 'Password & privacy',
                    password: {
                        title: 'Password settings',
                    },
                    deleteAccount: {
                        title: 'Delete account',
                        subtitle: 'Once you delete your account, we will keep your data alive for 30 days. Once this period is over, your account will be permanently deleted and there is no going back. Please be certain.'
                    },
                },
                billing: {
                    title: 'Billing'
                },
                data: {
                    title: 'Data'
                },
                devices: {
                    title: 'Devices'
                },
            },
            advertisements: {
                title: 'Advertisements',
                create: {
                    title: 'Create advertisement'
                }
            }
        },

        // TOAST
        toast: {
            position: {
                create: {
                    success: 'Position created successfully.'
                },
                save: {
                    success: 'Position saved successfully.'
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
            },
            registerRequest: {
                success: 'We have successfully sent you a registration link.',
                notReachable: 'The registration email could not be sent to the specified email address.',
                alreadyRequested: 'You have already requested a registration for this email address. You can request the registration only once in 15 minutes.'
            },
            languageChange: {
                success: 'Language has been successfully changed.'
            },
            company: {
                update: {
                    success: 'Company details have been successfully updated.'
                },
                invitation: {
                    store: {
                        success: 'The invitation was created successfully.',
                        exists: 'An invitation with this email address already exists.',
                        userExists: 'A user with this email already exists in the system.'
                    }
                }
            },
            profile: {
                notification: {
                    success: 'Notification settings has been successfully updated.'
                },
                language: {
                    success: 'Language settings has been successfully updated.'
                },
                personal: {
                    success: 'Personal settings has been successfully updated.'
                },
                timezone: {
                    success: 'Timezone settings has been successfully updated.'
                },
                password: {
                    success: 'Password has been successfully changed.',
                    samePassword: 'New password must not match your current password.'
                }
            },
            logout: {
                success: 'You have been successfully logged out.'
            },
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
            }
        },

        // VALIDATION
        validation: {},

        // MODAL
        modal: {
            company: {
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
            }
        }
    }
})