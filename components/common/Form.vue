<template>
  <form :id="id" :action="action" :method="method" @submit.prevent="onSubmit">
    <slot
        :is-loading="isLoading"
        :first-error="firstError"
        :first-array-error="firstArrayError"
    />
  </form>
</template>

<script setup lang="ts">
import {FetchError} from "ofetch";
import type {FormHandler} from "~/types/common";
import type {JsonResponse} from "~/types/request";
import type {InvalidDataResponse} from "~/repositories/responses";
import type {FormExpose} from "~/types/components";
import {RESPONSE_CODE} from "~/types/enums";

const props = withDefaults(defineProps<{
  id: string
  handler: FormHandler,
  action?: string
  method?: string
}>(), {
  action: '#',
  method: 'POST'
})

const toaster = useToaster()
const {
  isLoading,
  setIsLoading,
  errors,
  clearErrors,
  parseErrors,
  firstError,
  firstArrayError,
  setError,
} = useForm()

async function onSubmit(event: SubmitEvent): Promise<void> {
  // start loading
  setIsLoading(true)

  // clear errors
  clearErrors()

  await handle(async () => {
    await props.handler.onSubmit({
      isLoading,
      setIsLoading,
      errors,
      clearErrors,
      parseErrors,
      firstError,
      firstArrayError,
      setError,
    }, event)
  }, async (e: any) => {
    // rethrow error which is not connected
    // to the request
    if (!(e instanceof FetchError)) {
      return false
    }

    const error = e as FetchError<JsonResponse>

    // invalid content response
    if (error.response!._data!.code === RESPONSE_CODE.INVALID_CONTENT) {
      await handleInvalidData(error.response!._data as InvalidDataResponse)

      return true
    }

    let status = false

    // custom error handler for some specific cases
    if (props.handler.onError) {
      status = await props.handler.onError(error.response!, {
        isLoading,
        setIsLoading,
        errors,
        clearErrors,
        parseErrors,
        firstError,
        firstArrayError,
        setError,
      }, event)
    }

    // error was handled in the custom onError callback
    if (status) {
      return true
    }

    return false
  })

  setIsLoading(false)
}

async function handleInvalidData(response: InvalidDataResponse) {
  // parse errors from response
  parseErrors(response)

  // show notification message
  await toaster.error({
    title: 'toast.common.formErrors'
  })
}

function validate(): boolean {
  return (document.getElementById(props.id) as HTMLFormElement).checkValidity()
}

defineExpose<FormExpose>({
  validate
})
</script>
