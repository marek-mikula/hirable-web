import type {AuthRepositoryInterface} from "~/repositories/auth/AuthRepositoryInterface";
import type {RegisterRepositoryInterface} from "~/repositories/register/RegisterRepositoryInterface";
import type {PasswordRepositoryInterface} from "~/repositories/password/PasswordRepositoryInterface";
import type {CompanyRepositoryInterface} from "~/repositories/company/CompanyRepositoryInterface";
import type {CompanyInvitationRepositoryInterface} from "~/repositories/companyInvitation/CompanyInvitationRepositoryInterface";
import type {CompanyUserRepositoryInterface} from "~/repositories/companyUser/CompanyUserRepositoryInterface";
import type {SearchRepositoryInterface} from "~/repositories/search/SearchRepositoryInterface";
import type {GridRepositoryInterface} from "~/repositories/grid/GridRepositoryInterface";
import type {GridSettingRepositoryInterface} from "~/repositories/grid/GridSettingRepositoryInterface";
import type {CandidateRepositoryInterface} from "~/repositories/candidate/CandidateRepositoryInterface";
import type {ClassifierRepositoryInterface} from "~/repositories/classifier/ClassifierRepositoryInterface";
import type {PositionSuggestRepositoryInterface} from "~/repositories/positionSuggest/PositionSuggestRepositoryInterface";
import type {PositionRepositoryInterface} from "~/repositories/position/PositionRepositoryInterface";
import type {PositionFileRepositoryInterface} from "~/repositories/positionFile/PositionFileRepositoryInterface";
import type {CompanyContactRepositoryInterface} from "~/repositories/companyContact/CompanyContactRepositoryInterface";
import type {PositionApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionApprovalRepositoryInterface";
import type {PositionExternalApprovalRepositoryInterface} from "~/repositories/positionApproval/PositionExternalApprovalRepositoryInterface";

export interface ApiInterface {
    auth: AuthRepositoryInterface
    register: RegisterRepositoryInterface
    password: PasswordRepositoryInterface
    company: CompanyRepositoryInterface
    companyInvitation: CompanyInvitationRepositoryInterface
    companyContact: CompanyContactRepositoryInterface
    companyUser: CompanyUserRepositoryInterface
    search: SearchRepositoryInterface
    grid: GridRepositoryInterface
    gridSetting: GridSettingRepositoryInterface
    candidate: CandidateRepositoryInterface
    classifier: ClassifierRepositoryInterface
    position: PositionRepositoryInterface
    positionSuggest: PositionSuggestRepositoryInterface
    positionFile: PositionFileRepositoryInterface
    positionApproval: PositionApprovalRepositoryInterface
    positionExternalApproval: PositionExternalApprovalRepositoryInterface
}