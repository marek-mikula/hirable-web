import type {ApiInterface} from "~/types/plugins/api.types";
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
import {CompanyContactRepository} from "~/repositories/companyContact/CompanyContactRepository";
import {PositionApprovalRepository} from "~/repositories/positionApproval/PositionApprovalRepository";
import {PositionExternalApprovalRepository} from "~/repositories/positionApproval/PositionExternalApprovalRepository";
import {NotificationRepository} from "~/repositories/notification/NotificationRepository";
import {UserRepository} from "~/repositories/user/UserRepository";
import {FileRepository} from "~/repositories/file/FileRepository";
import {ApplicationRepository} from "~/repositories/application/ApplicationRepository";
import {ProcessStepRepository} from "~/repositories/processStep/ProcessStepRepository";
import {PositionProcessStepRepository} from "~/repositories/positionProcessStep/PositionProcessStepRepository";
import {PositionCandidateRepository} from "~/repositories/positionCandidate/PositionCandidateRepository";
import {PositionCandidateActionRepository} from "~/repositories/positionCandidateAction/PositionCandidateActionRepository";
import {PositionCandidateShareRepository} from "~/repositories/positionCandidateShare/PositionCandidateShareRepository";
import {PositionCandidateEvaluationRepository} from "~/repositories/positionCandidateEvaluation/PositionCandidateEvaluationRepository";
import {Client} from "~/repositories/Client";

export default defineNuxtPlugin({
    name: 'api',
    async setup() {
        const client = new Client()

        const api: ApiInterface = {
            application: new ApplicationRepository(client),
            auth: new AuthRepository(client),
            register: new RegisterRepository(client),
            password: new PasswordRepository(client),
            company: new CompanyRepository(client),
            companyInvitation: new CompanyInvitationRepository(client),
            companyContact: new CompanyContactRepository(client),
            companyUser: new CompanyUserRepository(client),
            search: new SearchRepository(client),
            grid: new GridRepository(client),
            gridSetting: new GridSettingRepository(client),
            candidate: new CandidateRepository(client),
            classifier: new ClassifierRepository(client),
            position: new PositionRepository(client),
            positionSuggest: new PositionSuggestRepository(client),
            positionApproval: new PositionApprovalRepository(client),
            positionExternalApproval: new PositionExternalApprovalRepository(client),
            positionProcessStep: new PositionProcessStepRepository(client),
            positionCandidate: new PositionCandidateRepository(client),
            positionCandidateAction: new PositionCandidateActionRepository(client),
            positionCandidateShare: new PositionCandidateShareRepository(client),
            positionCandidateEvaluation: new PositionCandidateEvaluationRepository(client),
            processStep: new ProcessStepRepository(client),
            notification: new NotificationRepository(client),
            user: new UserRepository(client),
            file: new FileRepository(client),
        }

        return {
            provide: {
                api
            }
        }
    }
})