import _ from 'lodash'
import type {FormObject, FormValue} from "~/types/common";
import type {DataCollectorInterface} from "~/types/plugins/dataCollector.types";

class DataCollector implements DataCollectorInterface {
    public collect(...objects: FormObject[]): FormData {
        const formData = new FormData()

        for (const object of objects) {
            for (const key in object) {
                this.collectValue(formData, key, object[key])
            }
        }

        return formData
    }

    private collectValue(formData: FormData, key: string, value: FormValue): void {
        if (value instanceof File) {
            formData.set(key, value)

            return
        }

        if (_.isArray(value)) {
            for (const [index, item] of value.entries()) {
                this.collectValue(formData, `${key}[${index}]`, item)
            }

            return
        }

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            for (const subKey in value) {
                this.collectValue(formData, `${key}[${subKey}]`, value[subKey])
            }

            return
        }

        if (_.isBoolean(value)) {
            formData.set(key, value ? '1' : '0')

            return
        }

        formData.set(key, _.toString(value))
    }
}

export default defineNuxtPlugin({
    name: 'dataCollector',
    async setup() {
        const dataCollector = new DataCollector()

        return {
            provide: {
                dataCollector
            }
        }
    }
})