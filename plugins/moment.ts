import moment from 'moment';

export default defineNuxtPlugin({
    name: 'moment',
    async setup() {
        return {
            provide: {
                moment: moment
            }
        }
    }
})