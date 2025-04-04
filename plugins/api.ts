import {AuthRepository} from "~/repositories/auth/AuthRepository";
import type {AuthRepositoryInterface} from "~/repositories/auth/AuthRepositoryInterface";
import {RegisterRepository} from "~/repositories/register/RegisterRepository";
import type {RegisterRepositoryInterface} from "~/repositories/register/RegisterRepositoryInterface";
import {PasswordRepository} from "~/repositories/password/PasswordRepository";
import type {PasswordRepositoryInterface} from "~/repositories/password/PasswordRepositoryInterface";
import {CompanyRepository} from "~/repositories/company/CompanyRepository";
import type {CompanyRepositoryInterface} from "~/repositories/company/CompanyRepositoryInterface";
import {SearchRepository} from "~/repositories/search/SearchRepository";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import {CompanyInvitationRepository} from "~/repositories/companyInvitation/CompanyInvitationRepository";
import type {GridRepositoryInterface} from "~/repositories/grid/GridRepositoryInterface";
import {GridRepository} from "~/repositories/grid/GridRepository";
import type {GridSettingRepositoryInterface} from "~/repositories/grid/GridSettingRepositoryInterface";
import {GridSettingRepository} from "~/repositories/grid/GridSettingRepository";
import type {CandidateRepositoryInterface} from "~/repositories/candidate/CandidateRepositoryInterface";
import {CandidateRepository} from "~/repositories/candidate/CandidateRepository";
import type {CompanyUserRepositoryInterface} from "~/repositories/companyUser/CompanyUserRepositoryInterface";
import {CompanyUserRepository} from "~/repositories/companyUser/CompanyUserRepository";

export type Api = {
    auth: AuthRepositoryInterface
    register: RegisterRepositoryInterface
    password: PasswordRepositoryInterface
    company: CompanyRepositoryInterface
    companyInvitation: CompanyInvitationRepositoryInterface
    companyUser: CompanyUserRepositoryInterface
    search: SearchRepositoryInterface
    grid: GridRepositoryInterface
    gridSetting: GridSettingRepositoryInterface
    candidate: CandidateRepositoryInterface
}

export default defineNuxtPlugin({
    name: 'api',
    async setup() {
        const api: Api = {
            auth: new AuthRepository(),
            register: new RegisterRepository(),
            password: new PasswordRepository(),
            company: new CompanyRepository(),
            companyInvitation: new CompanyInvitationRepository(),
            companyUser: new CompanyUserRepository(),
            search: new SearchRepository(),
            grid: new GridRepository(),
            gridSetting: new GridSettingRepository(),
            candidate: new CandidateRepository(),
        }

        return {
            provide: {
                api
            }
        }
    }
})