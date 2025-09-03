import {POSITION_ROLE, ROLE} from "~/types/enums";

export const positionConfig = {

    /*
    |--------------------------------------------------------------------------
    | Files
    |--------------------------------------------------------------------------
    |
    | List of available extensions, max. size of one single file and max. number of files.
    |
    */

    files: {
        extensions: ['pdf', 'docx', 'xlsx'],
        maxSize: 2 * 1024 * 1024,
        maxFiles: 5
    },

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

    },

    // maximum number of tags for position entity
    maxTags: 10,

}