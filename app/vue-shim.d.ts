import Vue from 'vue'
import { Validation } from 'vuelidate'

declare module '*.vue' {
    export default Vue
}

declare module 'vue/types/options' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ComponentOptions<V extends Vue> {
        servicePrefix?: string,
        resourcePrefix?: string
    }
}

declare type ElementWithValidation = (Vue | Element) & Validation
