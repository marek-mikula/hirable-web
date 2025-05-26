export default defineI18nLocale(async () => {
    return {
        // COMMON
        common: {
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
                show: 'Ukázat',
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
                home: 'Domů'
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
                loadingData: 'Načítám data',
                noData: 'Nebyla nalezena žádná data. Zkuste změnit filtr nebo vyhledávací dotaz.',
                selected: 'Vybráno položek',
                resultsNumber: '{from} až {to} z {total} výsledků',
                previous: 'Předchozí',
                next: 'Další',
                search: 'Hledat v tabulce',
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
            }
        },

        // TOOLTIP
        tooltip: {
            layout: {
                notifications: 'Notifikace',
                language: 'Jazyk aplikace',
            },
            table: {
                settings: 'Nastaveni tabulky',
                sort: {
                    asc: 'Seřadit vzestupně',
                    desc: 'Seřadit sestupně',
                    default: 'Zrušit řazení'
                }
            }
        },

        // MODEL
        model: {
            common: {
                id: 'ID',
                email: 'E-mailová adresa',
                phone: 'Telefonní číslo',
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
                languageLevel: 'Jazyková úroveň'
            },
            user: {
                timezone: 'Časová zóna',
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
                environment: 'Pracovní prostředí',
                benefits: 'Benefity',
                roles: {
                    admin: 'Administrátor',
                    user: 'Uživatel',
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
                department: 'Oddělení',
                field: 'Obor',
                workload: 'Typ úvazku',
                employmentRelationship: 'Pracovní poměr',
                employmentForm: 'Forma spolupráce',
                jobSeatsNum: 'Počet pracovních míst',
                description: 'Popis',
                isTechnical: 'Technická pozice',
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
                seniority: 'Seniorita',
                experience: 'Min. počet odpracovaných roků',
                note: 'Poznámka',
                files: 'Soubory',
                drivingLicence: 'Řidičský průkaz',
                organisationSkills: 'Organizační dovednosti',
                teamSkills: 'Týmová spolupráce',
                timeManagement: 'Time management',
                communicationSkills: 'Komunikační schopnosti',
                leadership: 'Vedení lidí',
            }
        },

        // FORM
        form: {
            hint: {
                common: {
                    url: 'Prosím zadejte platnou URL adresu včetně protokolu (https:// nebo http://).'
                },
                user: {
                    password: 'Heslo musí mít alespoň 8 znaků a obsahovat alespoň 1 velké písmeno, 1 speciální znak a 1 číslo.',
                    timezone: 'Pokud není nastaveno žádné časové pásmo, časové pásmo se vypočítá z vašeho prohlížeče nebo se použije výchozí časové pásmo.'
                },
                token: {
                    verificationCode: 'Zadejte prosím Váš tajný kód z e-mailu, abychom ověřili, že jste to skutečně Vy.'
                },
                company: {
                    profile: {
                        environment: {
                            benefits: 'Vybrané benefity budou předvybrány ve formuláři při vytváření pozice.'
                        }
                    }
                },
                position: {
                    description: 'Detailní popis pozice zlepší vešekeré prvky umělé inteligence během celého náborového procesu.',
                    department: 'Automaticky se Vám doporučují přechozí použité hodnoty.',
                    isTechnical: 'V případě zaškrtnutí pole zviditelní další pole specifické pro technické pozice - Seniorita',
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
            navbar: {
                search: {
                    placeholder: 'Hledat...'
                },
            },
            menu: {
                main: 'Hlavní menu',
                settings: 'Nastavení',
                logout: 'Odhlásit se',
                create: {
                    title: 'Vytvořit',
                    position: 'Vytvořit pozici',
                    advertisement: 'Vytvořit inzerát',
                },
            }
        },

        // PAGE
        page: {
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
                    subtitle: 'Pozice je interní entita a vyplněné informace nebudou sdíleny s kandidátem, pokud to vysloveně nepovolíte při vytváření inzerátu.',
                    fromPrompt: 'Vytvořit ze zadání (AI)',
                    fromFile: 'Vytvořit ze souboru (AI)',
                    sections: {
                        basicInfo: '📝 Základní informace',
                        place: '📍 Místo výkonu práce',
                        offer: '💰 Nabídka',
                        hardSkills: '💪 Tvrdé dovednosti',
                        softSkills: {
                            title: '🤝 Měkké dovednosti',
                            subtitle: 'Zvolte potřebnou úroveň měkkých dovedností pro výkon příslušné pozice - 0 = vůbec na tom nezáleží, 10 = je to velmi důležité.',
                        },
                        languageSkills: {
                            title: '🗣️ Jazykové dovednosti',
                            subtitle: 'Pro přidání jazykových dovedností nejdříve vyberte požadovaný jazyk, následně úroveň jazyka, a klikněte na tlačítko "Přidat".'
                        },
                        other: '🗂️ Ostatní'
                    },
                    placeholder: {
                        description: 'Stručně popište hlavní odpovědnosti, technologie nebo nástroje, se kterými bude kandidát pracovat, potřebné certifikace, a co od něj očekáváte.'
                    }
                }
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
                    environment: {
                        description: 'Detailní popis pracovního prostředí ve Vaší společnosti pomůže aplikaci lépe hodnotit, jak kandidát k Vám do firmy zapadne.',
                        placeholder: 'Nálada v naší firmě je neformální, máme pet-friendly kanceláře, často chodíme na brunch, ...'
                    }
                },
                settings: {
                    title: 'Nastavení',
                },
                invitations: {
                    title: 'Pozvánky'
                },
                users: {
                    title: 'Uživatelé'
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
                    timezone: {
                        title: 'Nastavení časové zóny',
                        subtitle: 'Časové pásmo ovlivňuje časový posun od času UTC.',
                    },
                },
                notifications: {
                    title: 'Notifikace',
                    application: {
                        title: 'Aplikační upozornění',
                        subtitle: 'Upozornění na aktivitu v aplikaci.',
                    },
                    marketing: {
                        title: 'Marketingová oznámení',
                        subtitle: 'Oznámení aplikace o marketingových akcích, prodejích, nabídkách atd.',
                    },
                    technical: {
                        title: 'Technická oznámení',
                        subtitle: 'Upozornění na nové aktualizace, změny a výpadky v aplikaci.',
                    },
                    types: {
                        app: {
                            label: 'Aplikace',
                            hint: 'Oznámení v aplikaci, která se zobrazují na postranním panelu oznámení na pravé straně aplikace.'
                        },
                        mail: {
                            label: 'Mail',
                            hint: 'E-mailová upozornění.'
                        },
                    }
                },
                privacy: {
                    title: 'Heslo & soukromí',
                    password: {
                        title: 'Nastavení hesla',
                    },
                    deleteAccount: {
                        title: 'Smazání účtu',
                        subtitle: 'Jakmile svůj účet smažete, vaše data uchováme po dobu 30 dnů. Po uplynutí tohoto období bude váš účet trvale smazán a není cesty zpět. Buďte si prosím jisti.'
                    },
                },
                billing: {
                    title: 'Fakturace'
                },
                data: {
                    title: 'Data'
                },
                devices: {
                    title: 'Zařízení'
                },
            },
            advertisements: {
                title: 'Inzeráty',
                create: {
                    title: 'Vytvořit inzerát'
                }
            }
        },

        // TOAST
        toast: {
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
            languageChange: {
                success: 'Jazyk byl úspěšně změněn.'
            },
            company: {
                update: {
                    success: 'Údaje o společnosti byly úspěšně upraveny.'
                },
                invitation: {
                    store: {
                        success: 'Pozvánka byla úspěšně vytvořena.',
                        exists: 'Pozvánka s touto emailovou adresou již existuje.',
                        userExists: 'Uživatel s tímto emailem již v systému existuje.'
                    }
                }
            },
            profile: {
                notification: {
                    success: 'Nastavení notifikací bylo úspěšně aktualizováno.'
                },
                language: {
                    success: 'Jazyková nastavení byla úspěšně aktualizována.'
                },
                personal: {
                    success: 'Osobní nastavení bylo úspěšně aktualizováno.'
                },
                timezone: {
                    success: 'Nastavení časového pásma bylo úspěšně aktualizováno.'
                },
                password: {
                    success: 'Heslo bylo úspěšně změněno.',
                    samePassword: 'Nové heslo se nesmí shodovat s Vaším aktuálním heslem.'
                }
            },
            logout: {
                success: 'Byli jste úspěšně odhlášeni.'
            },
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
            }
        },

        // VALIDATION
        validation: {},

        // MODAL
        modal: {
            company: {
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
            }
        }
    }
})