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
import type {UserRepositoryInterface} from "~/repositories/user/UserRepositoryInterface";
import {UserRepository} from "~/repositories/user/UserRepository";

export type Api = {
    auth: AuthRepositoryInterface
    register: RegisterRepositoryInterface
    password: PasswordRepositoryInterface
    company: CompanyRepositoryInterface
    companyInvitation: CompanyInvitationRepositoryInterface
    search: SearchRepositoryInterface
    grid: GridRepositoryInterface
    gridSetting: GridSettingRepositoryInterface
    user: UserRepositoryInterface
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
            search: new SearchRepository(),
            grid: new GridRepository(),
            gridSetting: new GridSettingRepository(),
            user: new UserRepository(),
        }

        return {
            provide: {
                api
            }
        }
    }
})