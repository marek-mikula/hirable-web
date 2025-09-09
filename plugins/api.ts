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

export default defineNuxtPlugin({
    name: 'api',
    async setup() {
        const api: ApiInterface = {
            application: new ApplicationRepository(),
            auth: new AuthRepository(),
            register: new RegisterRepository(),
            password: new PasswordRepository(),
            company: new CompanyRepository(),
            companyInvitation: new CompanyInvitationRepository(),
            companyContact: new CompanyContactRepository(),
            companyUser: new CompanyUserRepository(),
            search: new SearchRepository(),
            grid: new GridRepository(),
            gridSetting: new GridSettingRepository(),
            candidate: new CandidateRepository(),
            classifier: new ClassifierRepository(),
            position: new PositionRepository(),
            positionSuggest: new PositionSuggestRepository(),
            positionApproval: new PositionApprovalRepository(),
            positionExternalApproval: new PositionExternalApprovalRepository(),
            positionProcessStep: new PositionProcessStepRepository(),
            positionCandidate: new PositionCandidateRepository(),
            positionCandidateAction: new PositionCandidateActionRepository(),
            positionCandidateShare: new PositionCandidateShareRepository(),
            positionCandidateEvaluation: new PositionCandidateEvaluationRepository(),
            processStep: new ProcessStepRepository(),
            notification: new NotificationRepository(),
            user: new UserRepository(),
            file: new FileRepository(),
        }

        return {
            provide: {
                api
            }
        }
    }
})