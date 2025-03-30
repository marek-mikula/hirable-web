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
import type {InvalidDataResponse, JsonResponse} from "~/types/request";
import type {FormExpose} from "~/types/components";
import {RESPONSE_CODE} from "~/types/enums";
import {HandledRequestError} from "~/exceptions/HandledRequestError";

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

  // trigger callback
  if (props.handler.onErrorClear) {
    await props.handler.onErrorClear()
  }

  try {
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
  } catch (e) {
    // this error was already handle directly
    // in the repository
    if (e instanceof HandledRequestError) {
      return
    }

    // rethrow error which is not connected
    // to the request
    if (!(e instanceof FetchError)) {
      throw e
    }

    const error = e as FetchError<JsonResponse>

    // invalid content response
    if (error.response!._data!.code === RESPONSE_CODE.INVALID_CONTENT) {
      await handleInvalidData(error.response!._data as InvalidDataResponse)

      return
    }

    let status = false

    // custom error handler for some specific cases
    if (props.handler.onFail) {
      status = await props.handler.onFail(error.response!, {
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

    if (! status) {
      await toaster.serverError()
    }
  } finally {
    setIsLoading(false)
  }
}

async function handleInvalidData(response: InvalidDataResponse) {
  // parse errors from response
  parseErrors(response)

  // trigger callback
  if (props.handler.onError) {
    await props.handler.onError(response.data.errors)
  }

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
