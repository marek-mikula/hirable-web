import {POSITION_ROLE, ROLE} from "~/types/enums";

export const positionConfig = {

    /*
    |--------------------------------------------------------------------------
    | Roles
    |--------------------------------------------------------------------------
    |
    | List of position roles. The values represent a list of roles that
    | can fill a specific role in a given position.
    |
    */

    roles: {

        [POSITION_ROLE.RECRUITER]: [
            ROLE.ADMIN,
            ROLE.RECRUITER,
        ],

        [POSITION_ROLE.HIRING_MANAGER]: [
            ROLE.HIRING_MANAGER,
        ],

        [POSITION_ROLE.APPROVER]: [
            ROLE.ADMIN,
            ROLE.RECRUITER,
            ROLE.HIRING_MANAGER,
        ],

        [POSITION_ROLE.EXTERNAL_APPROVER]: [], // external approver is not bound to company roles

    }

}