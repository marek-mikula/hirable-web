import moment from 'moment';
import {czechMomentSpecification} from "~/i18n/moment/cs";

export default defineNuxtPlugin({
    name: 'moment',
    async setup() {
        // set needed translations for languages
        moment.updateLocale('cs', czechMomentSpecification)

        const {user} = useAuth()
        // @ts-expect-error
        const { locale } = useNuxtApp().$i18n

        // set correct moment locale by either user or i18n locale
        moment.locale(user.value?.language ?? locale.value ?? process.env.APP_LOCALE ?? 'en')

        return {
            provide: {
                moment: moment
            }
        }
    }
})