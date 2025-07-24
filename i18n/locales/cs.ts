export default defineI18nLocale(async () => {
    return {
        // COMMON
        common: {
            deleted: 'Smazáno',
            copied: 'Zkopírováno!',
            loading: 'Načítání',
            loadingData: 'Načítám data',
            boolean: {
                yes: 'Ano',
                no: 'Ne',
            },
            action: {
                save: 'Uložit',
                delete: 'Smazat',
                remove: 'Odstranit',
                update: 'Aktualizovat',
                submit: 'Odeslat',
                cancel: 'Zrušit',
                create: 'Vytvořit',
                new: 'Nový',
                add: 'Přidat',
                show: 'Zobrazit',
                download: 'Stáhnout',
                upload: 'Nahrát',
                uploadAgain: 'Nahrát znovu',
                ok: 'OK',
                confirm: 'Potvrdit',
                change: 'Změnit',
                backToLogin: 'Zpět na přihlášení',
                back: 'Zpět',
                continue: 'Pokračovat',
                close: 'Zavřít',
                understand: 'Rozumím',
                import: 'Importovat',
                choose: 'Vybrat',
                edit: 'Upravit',
                order: 'Seřadit',
                invite: 'Pozvat',
                search: 'Hledat',
                refresh: 'Obnovit',
                home: 'Domů',
                open: 'Otevřít',
                approve: 'Schválit',
                reject: 'Zamítnout',
                duplicate: 'Duplikovat',
            },
            datetime: {
                week: '{n}. týden',
                month: {
                    1: 'Leden',
                    2: 'Únor',
                    3: 'Březen',
                    4: 'Duben',
                    5: 'Květen',
                    6: 'Červen',
                    7: 'Červenec',
                    8: 'Srpen',
                    9: 'Září',
                    10: 'Říjen',
                    11: 'Listopad',
                    12: 'Prosinec',
                },
            },
            table: {
                actions: 'Akce',
                loadingData: 'Načítám data',
                noData: 'Nebyla nalezena žádná data. Zkuste změnit filtr nebo vyhledávací dotaz.',
                selected: 'Vybráno položek',
                resultsNumber: '{from} až {to} z {total} výsledků',
                previous: 'Předchozí',
                next: 'Další',
                search: 'Rychlé hledání',
            },
            error: 'Jejda. Něco se pokazilo. Obnovte prosím stránku. Pokud chyba přetrvává, kontaktujte podporu.',
        },

        // ERROR
        error: {
            title: {
                401: 'Nepřihlášený uživatel',
                403: 'Přístup odepřen',
                404: 'Stránka nenalezena',
                429: 'Příliš mnoho požadavků',
                500: 'Chyba serveru',
                503: 'Probíhá údržba',
            },
            message: {
                401: 'Pro zobrazení této stránky je potřeba se přihlásit.',
                403: 'Nemáte dostatečná práva pro přístup k tomuto obsahu.',
                404: 'Požadovaná stránka nebyla nalezena. Může být smazaná nebo adresa neplatná.',
                429: 'Odeslal(a) jste příliš mnoho požadavků v krátkém čase. Zkuste to později.',
                500: 'Došlo k nečekané chybě. Omlouváme se za potíže.',
                503: 'Probíhá údržba serveru. Zkuste to později.',
            },
            custom: {
                approve: {
                    invalidToken: {
                        title: 'Neplatný odkaz',
                        message: 'Váš schvalovací odkaz je neplatný. Již byl dřív použit, nebo byl schvalovací proces zrušen.',
                    }
                },
                apply: {
                    invalidToken: {
                        title: 'Neplatný odkaz',
                        message: 'Odkaz pro přihlášení do výběrového řízení je neplatný. Pozice neexistuje.',
                    },
                    applicationEnded: {
                        title: 'Výběrové řízení skončilo',
                        message: 'Výběrové řízení na tuto pozici již skončilo.',
                    }
                }
            }
        },

        // TOOLTIP
        tooltip: {
            common: {
                clipboard: 'Klikněte pro zkopírování'
            },
            layout: {
                notifications: 'Notifikace',
                markAllAsRead: 'Označit vše jako přečteno',
                markAsRead: 'Označit jako přečteno',
                language: 'Jazyk aplikace',
            },
            table: {
                settings: 'Nastaveni tabulky',
                refresh: 'Obnovit data',
                sort: {
                    asc: 'Seřadit vzestupně',
                    desc: 'Seřadit sestupně',
                    default: 'Zrušit řazení'
                }
            },
            position: {
                cancelApproval: 'Zruší schvalovací proces nehledě na stav schválení jednotlivých schvalovatelů.',
                create: 'Vytvoří pozici jako rozpracovanou',
                open: 'Otevře pozici pro nábor',
                save: 'Uloží pozici v aktuálním stavu',
                sendForApproval: 'Odešle pozici na schválení vybraným schvalovatelům',
                states: {
                    draft: 'Pozice je rozpracovaná a čeká na dokončení či schválení.',
                    approvalPending: 'Pozice čeká na schválení schvalovateli. V tuto chvíli není možné pozici editovat.',
                    approvalApproved: 'Pozice byla úspěšně schválena všemi schvalovateli.',
                    approvalRejected: 'Některý ze schvalovatelů pozici zamítnul, čímž došlo ke zrušení celého schvalovacího procesu.',
                    approvalCanceled: 'Schvalovací proces byl zrušen.',
                    approvalExpired: 'Některý ze schvalovatelů se nevyjádřil včas, čímž došlo ke zrušení schvalovacího procesu.',
                    opened: 'Pozice je otevřená. Lze na ni aktivně vytvářet inzeráty a nabírat kandidáty.',
                    closed: 'Pozice je uzavřená. Nabírání kandidátů již skončilo a ideální kandidát byl nalezen.',
                    canceled: 'Pozice je zrušená. Již s ní nelze pracovat.',
                },
                approval: 'Celkem schváleno / Celkem schvalovatelů'
            },
        },

        // MODEL
        model: {
            common: {
                id: 'ID',
                email: 'E-mailová adresa',
                phone: 'Telefon',
                phoneNumber: 'Telefonní číslo',
                phonePrefix: 'Předvolba',
                name: 'Jméno',
                firstname: 'Křestní jméno',
                lastname: 'Příjmení',
                title: 'Název',
                description: 'Popis',
                documents: 'Dokumenty',
                document: 'Dokument',
                type: 'Typ',
                role: 'Role',
                state: 'Stav',
                link: 'Odkaz',
                linkedin: 'LinkedIn',
                createdAt: 'Datum vytvoření',
                updatedAt: 'Datum poslední úpravy',
                deletedAt: 'Datum smazání',
                createdBy: 'Vytvořeno',
                language: 'Jazyk',
                communicationLanguage: 'Jazyk komunikace',
                languageLevel: 'Jazyková úroveň',
                note: 'Poznámka',
                owner: 'Vlastník',
                contact: 'Kontakt',
            },
            candidate: {
                cv: 'Životopis',
                otherFiles: 'Ostatní soubory'
            },
            user: {
                password: 'Heslo',
                currentPassword: 'Aktuální heslo',
                passwordConfirm: 'Potvrzení hesla',
                newPassword: 'Nové heslo',
                prefix: 'Tituly před jménem',
                postfix: 'Tituly za jménem',
            },
            company: {
                name: 'Název společnosti',
                idNumber: 'IČO společnosti',
                email: 'Kontaktní e-mailová adresa společnosti',
                website: 'Webové stránky společnosti',
                roles: {
                    admin: 'Administrátor',
                    recruiter: 'Recruiter',
                    hiringManager: 'Hiring Manažer',
                }
            },
            token: {
                validUntil: 'Datum expirace',
                usedAt: 'Datum použití',
                states: {
                    active: 'Aktivní',
                    expired: 'Expirován',
                    used: 'Použitý'
                }
            },
            position: {
                name: 'Název pozice',
                externName: 'Externí název pozice',
                approveUntil: 'Schválit do',
                approveMessage: 'Zpráva pro schvalovatele',
                department: 'Oddělení',
                field: 'Obor',
                workload: 'Typ úvazku',
                employmentRelationship: 'Pracovní poměr',
                employmentForm: 'Forma spolupráce',
                jobSeatsNum: 'Počet pracovních míst',
                description: 'Popis',
                address: 'Adresa pracoviště',
                salarySpan: 'Rozpětí mzdy od - do',
                salaryFrom: 'Mzda od',
                salaryTo: 'Mzda do',
                salary: 'Mzda',
                salaryType: 'Typ mzdy',
                salaryFrequency: 'Frekvence mzdy',
                salaryCurrency: 'Měna',
                salaryVar: 'Variabilní složka',
                benefits: 'Benefity',
                minEducationLevel: 'Minimální dosažené vzdělání',
                educationField: 'Obor vzdělání',
                seniority: 'Seniorita',
                experience: 'Min. počet odpracovaných roků',
                hardSkills: 'Ostatní tvrdé dovednosti',
                note: 'Poznámka',
                files: 'Soubory',
                organisationSkills: 'Organizační dovednosti',
                teamSkills: 'Týmová spolupráce',
                timeManagement: 'Time management',
                communicationSkills: 'Komunikační schopnosti',
                leadership: 'Vedení lidí',
                languageSkills: 'Jazykové dovednosti',
                hiringManagers: 'Hiring manažeři',
                recruiters: 'Náboráři',
                approvers: 'Schvalovatelé',
                externalApprovers: 'Externí schvalovatelé',
                hardSkillsWeight: 'Váha tvrdých dovedností',
                softSkillsWeight: 'Váha měkkých dovedností',
                languageSkillsWeight: 'Váha jazykových dovedností',
                experienceWeight: 'Váha pracovních zkušeností',
                educationWeight: 'Váha vzdělání',
                shareSalary: 'Sdílet mzdu',
                shareContact: 'Sdílet kontakt',
                commonLink: 'Obecný odkaz',
                internLink: 'Interní odkaz',
                referralLink: 'Referral odkaz',
                roles: {
                    hiringManager: 'Hiring manažer',
                    approver: 'Schvalovatel',
                    externalApprover: 'Externí schvalovatel',
                },
                states: {
                    draft: 'Rozpracovaná',
                    approvalPending: 'Čeká na schválení',
                    approvalApproved: 'Schválená',
                    approvalRejected: 'Schválení zamítnuto',
                    approvalCanceled: 'Schválení zrušeno',
                    approvalExpired: 'Schválení vypršelo',
                    opened: 'Otevřená',
                    closed: 'Uzavřená',
                    canceled: 'Zrušená',
                },
                sections: {
                    basicInfo: '📝 Základní informace',
                    offer: '💰 Nabídka',
                    hardSkills: '💪 Tvrdé dovednosti',
                    softSkills: {
                        title: '🤝 Měkké dovednosti',
                        subtitle: 'Zvolte potřebnou úroveň měkkých dovedností pro výkon příslušné pozice - 0 = nezáleží, 100 = důležité.',
                    },
                    languageSkills: {
                        title: '🗣️ Jazykové dovednosti',
                        subtitle: 'Pro přidání jazykových dovedností nejdříve vyberte požadovaný jazyk, následně úroveň jazyka, a klikněte na tlačítko "Přidat".'
                    },
                    other: '🗂️ Ostatní',
                    recruitment: {
                        title: '📢 Nábor',
                        subtitle: 'Atributy ovlivňující proces náboru.'
                    },
                    roles: '👤 Role',
                    approval: '👍 Schvalování',
                    share: {
                        title: '🔗 Sdílení',
                        subtitle: 'Atributy ovlivňující sdílení informací o pozici mimo systém.'
                    }
                },
            },
            positionApproval: {
                round: 'Kolo',
                decidedAt: 'Datum rozhodnutí',
                remindedAt: 'Datum připomínky',
                states: {
                    pending: 'Čeká na schválení',
                    approved: 'Schváleno',
                    rejected: 'Zamítnuto',
                    canceled: 'Zrušeno',
                    expired: 'Expirováno'
                }
            }
        },

        // FORM
        form: {
            required: 'Povinný údaj',
            hint: {
                common: {
                    url: 'Prosím zadejte platnou URL adresu včetně protokolu (https:// nebo http://).',
                    suggest: 'Automaticky se Vám doporučují přechozí použité hodnoty.',
                    phoneNumber: 'Zadejte telefonní číslo bez mezer a telefonní předvolby.'
                },
                user: {
                    password: 'Heslo musí mít alespoň 8 znaků a obsahovat alespoň 1 velké písmeno, 1 speciální znak a 1 číslo.',
                },
                token: {
                    verificationCode: 'Zadejte prosím Váš tajný kód z e-mailu, abychom ověřili, že jste to skutečně Vy.'
                },
                position: {
                    description: 'Detailní popis pozice zlepší vešekeré prvky umělé inteligence během celého náborového procesu.',
                    externalApprovers: 'Pro přiřazení exterího schvalovatele je nutné nejdříve vytvořit kontakt.',
                    approveUntil: 'Pokud nedojde ke schválení do zvoleného data, rozhodovací proces se automaticky zruší.',
                    approveMessage: 'Zpráva bude poslána ve schvalovacím emailu schvalovatelům.',
                    externName: 'Externí název pozice se použije všude, kde bude docházet ke sdílení informací mimo systém (např. registrační formulář kandidáta, sdílení pozice na inzertní portály).',
                    shareSalary: 'V případě zaškrtnutí bude mzda sdílena s kandidátem skrze registrační formulář a pracovní portály (pokud to podporují).',
                    shareContact: 'V případě zaškrtnutí bude kontakt na vlastníka pozice sdílen s kandidátem skrze registrační formulář a pracovní portály (pokud to podporují).',
                }
            },
            help: {
                company: {
                    language: 'Jazyk společnosti slouží pro statické texty generované AI (např. hodnocení kandidátů).'
                },
                position: {
                    hardSkillsWeight: 'Váha tvrdých dovedností určuje, jak bude umělá inteligence hodnotit kandidáta z pohledu jeho tvrdých dovedností (0 = nezáleží, 100 = důležité).',
                    softSkillsWeight: 'Váha měkkých dovedností určuje, jak bude umělá inteligence hodnotit kandidáta z pohledu jeho měkkých dovedností (0 = nezáleží, 100 = důležité). ',
                    languageSkillsWeight: 'Váha jazykových dovedností určuje, jak bude umělá inteligence hodnotit kandidáta z pohledu jeho jazykových dovedností (0 = nezáleží, 100 = důležité).',
                    experienceWeight: 'Váha pracovních zkušeností určuje, jak bude umělá inteligence hodnotit kandidáta z pohledu jeho pracovních zkušeností (0 = nezáleží, 100 = důležité).',
                    educationWeight: 'Váha vzdělání určuje, jak bude umělá inteligence hodnotit kandidáta z pohledu jeho vzdělání (0 = nezáleží, 100 = důležité).',
                }
            },
            select: {
                chooseOption: 'Vyberte možnost',
                chooseOptions: 'Vyberte možnosti',
                unselectAll: 'Odvybrat vše',
                noOptions: 'Žádné možnosti',
                noOptionsQuery: 'Žádné výsledky pro "{q}"',
                search: 'Vyhledat',
                searchMin: 'Vyhledat (min. počet znaků: {n})',
                create: 'Vytvořit "{item}"',
                numSelectedOptions: 'Počet vybraných možností'
            },
            suggest: {
                noSuggestions: 'Žádné doporučené hodnoty'
            },
            fileUpload: {
                clickOrDrag: 'Klikněte nebo přetáhněte',
                select: 'Vybrat soubor'
            },
        },

        // LAYOUT
        layout: {
            notifications: {
                title: 'Notifikace',
                empty: 'Zatím nemáte žádné notifikace.'
            },
            navbar: {
                search: {
                    placeholder: 'Hledat...'
                },
            },
            menu: {
                footer: 'tvořeno s 💙',
                main: 'Hlavní menu',
                settings: 'Nastavení',
                logout: 'Odhlásit se',
                create: {
                    title: 'Vytvořit',
                    position: 'Vytvořit pozici',
                },
            }
        },

        // PAGE
        page: {
            apply: {
                positionDetail: 'Detail pozice',
                message: 'Dobrý den, vážíme si Vašeho zájmu o pracovní nabídku. Níže najdete detailní informace o pozici a kontaktní formulář pro zařazení do výběrového řízení. Hodně stěstí!',
            },
            applySuccess: {
                title: 'Přihláška odeslána',
                message: 'Vaše přihláška na pozici byla úspěšně odeslána. Děkujeme. Budeme Vás co nevidět kontaktovat.',
            },
            dashboard: {
                title: 'Přehled'
            },
            candidates: {
                title: 'Kandidáti'
            },
            positions: {
                title: 'Pozice',
                create: {
                    title: 'Vytvořit pozici',
                    subtitle: 'Pozice je interní entita a vyplněné informace nebudou sdíleny s kandidátem, pokud to vysloveně nepovolíte v sekci Sdílení.',
                    fromPrompt: 'Vytvořit ze zadání (AI)',
                    fromFile: 'Vytvořit ze souboru (AI)',
                    placeholder: {
                        description: 'Popište hlavní odpovědnosti, náplň práce, tým a pracovní prostředí.',
                        hardSkills: 'Popište ostatní potřebné tvrdé dovednoti, certifikace, programovací jazyky, absolvované kurzy, apod.'
                    },
                    sendForApproval: 'Odeslat ke schválení',
                    cancelApproval: 'Zrušit schvalování',
                    usePositionName: 'Použít název pozice',
                },
                detail: {
                    links: '🎯 Náborové odkazy',
                    tabs: {
                        detail: 'Detail',
                        candidates: 'Kandidáti',
                        advertisements: 'Inzeráty',
                        statistics: 'Statistika'
                    }
                },
                approve: {
                    title: 'Schválení pozice'
                },
            },
            search: {
                title: 'Vyhledávání "{query}"'
            },
            login: {
                title: 'Přihlášení',
                notAMember: 'Nemáte účet?',
                createAnAccount: 'Vytvořit účet!',
                rememberMe: 'Pamatovat si mě',
                forgotPassword: 'Zapomenuté heslo',
                signIn: 'Přihlásit se'
            },
            registerRequest: {
                title: 'Vytvořit účet',
                subtitle: 'Zadejte prosím svou e-mailovou adresu a my Vám zašleme odkaz pro dokončení registrace.',
                requestRegistration: 'Požádat o registraci'
            },
            register: {
                title: 'Dokončení registrace',
                subtitle: 'Pro dokončení registrace nám prosím řekněte něco o sobě a o Vaší společnosti.',
                gdpr: {
                    text: 'Kliknutím na tlačítko "Zaregistrovat se" souhlasíte s {gdprButton} a {termsButton}.',
                    gdprButton: 'GDPR',
                    termsButton: 'VOP',
                },
                submit: 'Zaregistrovat se'
            },
            invitation: {
                title: 'Pozvánka do aplikace',
                subtitle: 'Někdo Vás pozval do naší aplikace. Pro dokončení registrace nám prosím řekněte něco o sobě.',
            },
            forgottenPassword: {
                title: 'Zapomenuté heslo',
                subtitle: 'Zadejte emailovou adresu, na kterou je registrován Váš účet. Pokud daný účet existuje, pošleme Vám odkaz pro nastavení nového hesla.',
                submit: 'Odeslat odkaz pro obnovení hesla',
            },
            resetPassword: {
                title: 'Nastavení nového hesla',
                submit: 'Nastavit heslo'
            },
            company: {
                title: 'Společnost',
                information: {
                    title: 'Informace',
                    basic: {
                        title: 'Základní údaje'
                    },
                },
                invitations: {
                    title: 'Pozvánky'
                },
                users: {
                    title: 'Uživatelé'
                },
                contacts: {
                    title: 'Kontakty'
                },
                settings: {
                    title: 'Nastavení',
                    language: {
                        title: 'Nastavení jazyka'
                    }
                }
            },
            profile: {
                title: 'Profil',
                information: {
                    title: 'Informace',
                    personal: {
                        title: 'Osobní údaje'
                    },
                },
                settings: {
                    title: 'Nastavení',
                    language: {
                        title: 'Nastavení jazyka',
                    },
                },
                privacy: {
                    title: 'Heslo & soukromí',
                    password: {
                        title: 'Nastavení hesla',
                    },
                },
            },
        },

        // TOAST
        toast: {
            apply: {
                duplicate: 'Na tuto pozici již Vaši přihlášku se zadaným emailem nebo telefonním číslem registrujeme.'
            },
            position: {
                duplicate: 'Pozice byla úspěšně zduplikována.',
                approvalCanceled: 'Schvalovací proces pozice byl úspěšně zrušen.',
                create: 'Pozice byla úspěšně vytvořena.',
                open: 'Pozice byla úspěšně otevřena.',
                save: 'Pozice byla úspěšně uložena.',
                edit: 'Pozice byla úspěšně upravena.',
                approve: 'Pozice byla úspěšně schválena.',
                reject: 'Pozice byla úspěšně zamítnuta.',
                delete: 'Pozice byla úspěšně smazána.',
                sendForApproval: 'Pozice byla úspěšně odeslána ke schválení.',
                file: {
                    delete: 'Soubor pozice byl úspěšně odstraněn.'
                }
            },
            common: {
                unauthenticated: 'Vaše relace vypršela. Přihlaste se prosím znovu.',
                unauthorized: 'K provedení této akce nemáte oprávnění.',
                guest: 'K tomuto zdroji nemáte přístup, když jste přihlášeni. Byli jste automaticky přesměrováni do aplikace.',
                tooManyRequests: 'Příliš mnoho požadavků. Prosím zkuste to znovu později.',
                formErrors: 'Formulář obsahuje chyby.',
                error: 'Jejda. Něco se pokazilo. Zkuste to prosím znovu, nebo kontaktujte podporu na <a href="mailto:{email}" class="text-primary-600 hover:text-primary-500 hover:underline">{email}</a>, pokud problém přetrvává.',
                fileUpload: {
                    tooManyFiles: 'Soubor {name} se nepodařilo nahrát. Maximální počet souborů je {max}.',
                    fileTooBig: 'Soubor {name} se nepodařilo nahrát. Maximální velikost souboru je {max}.',
                }
            },
            registerRequest: {
                success: 'Úspěšně jsme Vám zaslali registrační odkaz.',
                notReachable: 'Na zadanou emailovou adresu se nepodařilo poslat registrační email.',
                alreadyRequested: 'Již jste požádali o registraci pro tuto e-mailovou adresu. O registraci můžete požádat pouze jednou za 15 minut.'
            },
            languageChange: 'Jazyk byl úspěšně změněn.',
            company: {
                update: 'Údaje o společnosti byly úspěšně upraveny.',
                invitation: {
                    delete: 'Pozvánka byla úspěšně smazána.',
                    store: {
                        success: 'Pozvánka byla úspěšně vytvořena.',
                        exists: 'Pozvánka s touto emailovou adresou již existuje.',
                        userExists: 'Uživatel s tímto emailem již v systému existuje.'
                    }
                },
                contact: {
                    store: 'Kontakt byl úspěšně vytvořen.',
                    update: 'Kontakt byl úspěšně upraven.',
                    delete: {
                        success: 'Kontakt byl úspěšně smazán.',
                        pendingApprovals: 'Kontakt nelze smazat, protože se účastní schvalovacího procesu na pozicích: {positions}.'
                    },
                }
            },
            profile: {
                language: {
                    success: 'Jazyková nastavení byla úspěšně aktualizována.'
                },
                personal: {
                    success: 'Osobní nastavení bylo úspěšně aktualizováno.'
                },
                password: {
                    success: 'Heslo bylo úspěšně změněno.',
                    samePassword: 'Nové heslo se nesmí shodovat s Vaším aktuálním heslem.'
                }
            },
            logout: 'Byli jste úspěšně odhlášeni.',
            passwordReset: {
                linkInvalid: 'Odkaz na resetování hesla je neplatný.',
                success: 'Heslo bylo úspěšně resetováno. Nyní se můžete přihlásit.',
            },
            register: {
                linkInvalid: 'Registrační odkaz je neplatný.',
                success: 'Registrace byla úspěšná.',
            },
            forgottenPassword: {
                success: 'Pokud e-mailová adresa existuje, poslali jsme vám odkaz pro obnovení hesla.',
                alreadyRequested: 'Již jste požádali o reset hesla pro tuto e-mailovou adresu. O reset hesla můžete požádat pouze jednou za 15 minut.'
            },
            login: {
                success: 'Byli jste úspěšně přihlášeni.',
                invalidCredentials: 'Dané přihlašovací údaje se neshodují!',
                verificationNeeded: 'Nejprve musíte ověřit svou emailovou adresu!',
            },
            grid: {
                updateColumnWidth: 'Šířka sloupce byla úspěšně uložena.',
                resetSettings: 'Nastavení tabulky bylo obnoveno do výchozího nastavení.',
                updateSettings: 'Nastavení tabulky bylo úspěšně uloženo.'
            },
            notification: {
                markRead: 'Notifikace byla úspěšně označená jako přečtená.',
                markAllRead: 'Notifikace byly úspěšně označené jako přečtené.',
            }
        },

        // MODAL
        modal: {
            apply: {
                confirm: {
                    title: 'Kontrola kontaktních údajů',
                    text: 'Zkontrolujte, prosím, zadané kontaktní údaje, jestli jsou správné.',
                }
            },
            company: {
                deleteInvitation: {
                    title: 'Smazat pozvánku',
                    text: 'Chystáte se smazat vybranou pozvánku. Jste si tím jisti? Akce je nevratná.'
                },
                deleteContact: {
                    title: 'Smazat kontakt',
                    text: 'Chystáte se smazat vybraný kontakt. Jste si tím jisti? Akce je nevratná. Kontakt bude odebrán ze všech míst, kde se používá.'
                },
                updateContact: {
                    title: 'Upravit kontakt'
                },
                storeContact: {
                    title: 'Vytvořit kontakt'
                },
                invite: {
                    title: 'Pozvat uživatele'
                }
            },
            grid: {
                settings: {
                    title: 'Nastavení tabulky',
                    columns: 'Sloupce',
                    stickyHeader: 'Plovoucí hlavička tabulky',
                    stickyHeaderHint: 'V případě zaškrtnutí se bude hlavička tabulky posouvat při skrolování obsahu.',
                    stickyFooter: 'Plovoucí patička tabulky',
                    stickyFooterHint: 'V případě zaškrtnutí se bude patička tabulky posouvat při skrolování obsahu.',
                    perPage: 'Počet výsledků na stránku',
                    resetDefault: 'Obnovit výchozí'
                },
                filter: {
                    title: 'Filtr',
                    reset: 'Resetovat',
                }
            },
            fileDelete: {
                title: 'Smazání souboru',
                text: 'Opravdu si přejete odstranit soubor {file}?'
            },
            position: {
                delete: {
                    title: 'Smazat pozici',
                    text: 'Opravdu si přejete smazat tuto pozici? Akci nebude možné vrátit.'
                },
                approvalHistory: {
                    title: 'Historie schvalování',
                },
                edit: {
                    title: 'Upravit pozici',
                },
                cancelApproval: {
                    title: 'Zrušení schvalování',
                    text: 'Opravdu si přejete zrušit proces schvalování? Schvalovatelé, kteří se již vyjádřili, nebo dostali schvalovací email, budou notifikováni o zrušení schvalovacího procesu.'
                },
                approve: {
                    title: 'Schválit pozici'
                },
                reject: {
                    title: 'Zamítnout pozici'
                },
                externalApprovers: {
                    title: 'Externí schvalovatelé',
                    text: 'Chystáte se odeslat pozici externím schvalovatelům. Jste si jisti, že chcete pozici odeslat na schválení těmto lidem?'
                }
            }
        },

        // NOTIFICATIONS
        notification: {
            invitation: {
                accepted: {
                    title: 'Pozvánka přijata',
                    message: 'Vaše pozvánka do systému byla přijata uživatelem {userName}.',
                },
            },
            position: {
                assigned_as_recruiter: {
                    title: 'Přiřazení jako náborář',
                    message: 'Byl/a jste přiřazen/a jako náborář k pozici {positionName}.'
                },
                assigned_as_hm: {
                    title: 'Přiřazení jako hiring manažer',
                    message: 'Byl/a jste přiřazen/a jako hiring manager k pozici {positionName}.'
                },
                removed_as_recruiter: {
                    title: 'Odebrání jako náborář',
                    message: 'Byl/a jste odebrán/a jako náborář z pozice {positionName}.'
                },
                removed_as_hm: {
                    title: 'Odebrání jako hiring manažer',
                    message: 'Byl/a jste odebrán/a jako hiring manager z pozice {positionName}.'
                },
                opened: {
                    title: 'Pozice otevřena',
                    message: 'Pozice {positionName} byla otevřena k náboru.',
                },
                approval: {
                    title: 'Pozice ke schválení',
                    message: 'Byl/a jste přiřazen/a jako schvalovatel na pozici {positionName}.',
                },
                approval_rejected: {
                    title: 'Pozice zamítnuta',
                    message: '{rejectedByName} zamítnul/a pozici {positionName}.',
                },
                approval_approved: {
                    title: 'Pozice schválena',
                    message: 'Pozice {positionName} byla úspěšně schválena.',
                },
                approval_expired: {
                    title: 'Schvalovací proces vypršel',
                    message: 'Schvalovací proces na pozici {positionName} vypršel.',
                },
                approval_canceled: {
                    title: 'Schvalovací proces zrušen',
                    message: 'Schvalovací proces na pozici {positionName} byl zrušen.',
                },
                approval_reminder: {
                    title: 'Pozice čeká na vyjádření',
                    message: 'Pozice {positionName} čeká na Vaše vyjádření ve schvalovacím procesu.',
                },
                new_candidate: {
                    title: 'Nový kandidát na pozici',
                    message: 'Na pozici {positionName} se přihlásil nový kandidát {candidateName}.'
                }
            },
        }
    }
})