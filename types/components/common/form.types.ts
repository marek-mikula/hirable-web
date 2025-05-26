import type {UseForm} from "~/types/composables/form.types";
import type {FetchResponse} from "ofetch/dist/node";
import type {JsonResponse} from "~/types/request";
import type {Promisable} from "~/types/common";

export type FormHandler = {
    onSubmit: (
        form: UseForm,
        event: SubmitEvent
    ) => Promisable<void>

    // if true is returned, the error has been handled, false otherwise
    onError?: (
        response: FetchResponse<JsonResponse>,
        form: UseForm,
        event: SubmitEvent
    ) => Promisable<boolean>
}