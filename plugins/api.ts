import {AuthRepository} from "~/repositories/auth/AuthRepository";
import {RegisterRepository} from "~/repositories/register/RegisterRepository";
import {PasswordRepository} from "~/repositories/password/PasswordRepository";
import {CompanyRepository} from "~/repositories/company/CompanyRepository";
import {SearchRepository} from "~/repositories/search/SearchRepository";
import {CompanyInvitationRepository} from "~/repositories/companyInvitation/CompanyInvitationRepository";
import {GridRepository} from "~/repositories/grid/GridRepository";
import {GridSettingRepository} from "~/repositories/grid/GridSettingRepository";
import {CandidateRepository} from "~/repositories/candidate/CandidateRepository";
import {CompanyUserRepository} from "~/repositories/companyUser/CompanyUserRepository";
import {ClassifierRepository} from "~/repositories/classifier/ClassifierRepository";
import {PositionSuggestRepository} from "~/repositories/positionSuggest/PositionSuggestRepository";
import {PositionRepository} from "~/repositories/position/PositionRepository";
import type {ApiInterface} from "~/types/plugins/api.types";
import {PositionFileRepository} from "~/repositories/positionFile/PositionFileRepository";
import {CompanyContactRepository} from "~/repositories/companyContact/CompanyContactRepository";
import {CompanyContactSuggestRepository} from "~/repositories/companyContactSuggest/CompanyContactSuggestRepository";

export default defineNuxtPlugin({
    name: 'api',
    async setup() {
        const api: ApiInterface = {
            auth: new AuthRepository(),
            register: new RegisterRepository(),
            password: new PasswordRepository(),
            company: new CompanyRepository(),
            companyInvitation: new CompanyInvitationRepository(),
            companyContact: new CompanyContactRepository(),
            companyContactSuggest: new CompanyContactSuggestRepository(),
            companyUser: new CompanyUserRepository(),
            search: new SearchRepository(),
            grid: new GridRepository(),
            gridSetting: new GridSettingRepository(),
            candidate: new CandidateRepository(),
            classifier: new ClassifierRepository(),
            position: new PositionRepository(),
            positionSuggest: new PositionSuggestRepository(),
            positionFile: new PositionFileRepository()
        }

        return {
            provide: {
                api
            }
        }
    }
})