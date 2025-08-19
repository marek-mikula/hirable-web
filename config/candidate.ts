export const candidateConfig = {

    /*
    |--------------------------------------------------------------------------
    | Files
    |--------------------------------------------------------------------------
    |
    | List of available extensions, max. file size for CVs and other files and max. number of files.
    |
    */

    files: {
        cv: {
            extensions: ['pdf', 'docx'],
            maxSize: 2 * 1024 * 1024,
        },
        other: {
            extensions: ['pdf', 'docx', 'xlsx', 'jpg', 'jpeg', 'png'],
            maxSize: 2 * 1024 * 1024,
            maxFiles: 5
        }
    },

    maxTags: 10,

}