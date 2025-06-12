<template>
  <div class="space-y-2">

    <!-- label -->
    <label
        v-if="label"
        :for="inputId"
        class="block text-sm font-medium text-gray-900"
    >
      {{ label }}
      <span v-if="required" class="font-bold text-red-500">*</span>
    </label>

    <!-- main input element -->
    <div class="relative">

      <ClientOnly>

        <!-- input for native validation -->
        <textarea
            v-model="model"
            :name="name"
            :id="inputId"
            :required="required"
            class="absolute inset-0 border-0"
            tabindex="-1"
            @focus="focusEditor"
        />

        <!-- wysiwyg editor -->
        <CommonWysiwyg
            v-model="model"
            ref="wysiwyg"
            :config="config"
            :disabled="disabled"
        />

        <template #fallback>
          <div class="flex p-5 rounded-md justify-center border border-gray-200">
            <div class="flex flex-col items-center space-y-2">
              <CommonSpinner variant="secondary"/>
            </div>
          </div>
        </template>

      </ClientOnly>

    </div>

    <!-- error container -->
    <p v-if="error" class="text-xs text-red-400">
      {{ error }}
    </p>

    <!-- hint container -->
    <p v-else-if="hint" class="text-xs text-gray-400">
      {{ hint }}
    </p>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {WysiwygConfig, WysiwygExpose} from "~/types/components/common/wysiwyg.types";

const props = withDefaults(defineProps<{
  config: WysiwygConfig
  name: string
  label?: string
  id?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
}>(), {
  required: false,
  disabled: false,
})

const model = defineModel<null | string>({default: null, required: false})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

const wysiwyg = ref<WysiwygExpose|null>(null)

function focusEditor(): void {
  wysiwyg.value?.focus()
}
</script>