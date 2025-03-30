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

      <!-- select for native input validation -->
      <select
          v-model="model"
          class="absolute block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-primary-600 text-sm"
          tabindex="-1"
          :required="required"
          :disabled="disabled"
          @focus="underlyingSelectFocused"
      >
        <option :value="model || 'none'">-</option>
      </select>

      <button
          :id="inputId"
          ref="buttonElement"
          :name="name"
          type="button"
          :class="[
              'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed',
              error ? 'text-red-900 ring-red-300 focus:ring-red-600' : 'text-gray-900 ring-gray-300 focus:ring-primary-600',
          ]"
          :disabled="disabled"
          @click="toggle"
      >

        <!-- selected text -->
        <span class="block truncate">
          {{ selectedLabel ?? emptyLabel ?? t('form.select.chooseOption') }}
        </span>

        <!-- select-like icon -->
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon :class="[error ? 'text-red-900' : 'text-gray-400', 'size-5']"/>
        </span>

      </button>

      <ul
          v-if="opened"
          ref="listElement"
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base border border-gray-200 shadow-sm focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
      >

        <!-- search input element -->
        <li>
          <input
              ref="searchElement"
              v-model="search"
              type="text"
              tabindex="0"
              name="q"
              :placeholder="minQuery ? $t('form.select.searchMin', {n: minQuery}) : $t('form.select.search')"
              class="block w-[calc(100%+0.5rem)] focus:ring-0 focus:border-gray-200 text-sm py-1.5 px-3 text-gray-700 bg-white border-0 border-b border-gray-200 sticky -top-1 -mt-1 mb-1 -mx-1 z-10 placeholder-gray-400 focus:outline-none"
          >
        </li>

        <!-- create option -->
        <li v-if="allowCreate" class="group/option text-gray-900 relative cursor-pointer select-none py-1.5 px-2 pr-7 rounded-md hover:bg-gray-50" @click="handleCreate">
          <span class="block text-sm">
            {{ createLabel ?? $t('common.action.create') }}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <PlusIcon class="size-5"/>
          </span>
        </li>

        <li v-if="loading" class="text-gray-900 py-1.5 px-2 text-sm">
          <CommonLoader/>
        </li>

        <template v-else-if="options.length > 0">
          <li
              v-for="option in options"
              :key="option.value"
              class="group/option text-gray-900 relative cursor-pointer select-none py-1.5 px-2 pr-7 rounded-md hover:bg-gray-50"
              role="option"
              @click="handleClick(option)"
          >
            <slot
                name="option"
                :option="option"
                :is-selected="isSelected"
                :render-option="renderOption"
            >
              <span :class="[isSelected(option) ? 'font-semibold' : '', 'block text-sm']">
                {{ renderOption(option) }}
              </span>
            </slot>

            <!-- selected checkmark -->
            <span v-show="isSelected(option)" class="text-primary-600 absolute inset-y-0 right-0 flex items-center pr-2">
              <CheckIcon class="size-5"/>
            </span>
          </li>
        </template>

        <!-- empty states, either for search or options -->
        <template v-else>
          <li v-if="search && (! minQuery || search.length >= minQuery)" class="text-gray-900 py-1.5 px-2 text-sm">
            {{ $t('form.select.noOptionsQuery', {q: search}) }}
          </li>
          <li v-else class="text-gray-900 py-1.5 px-2 text-sm">
            {{ $t('form.select.noOptions') }}
          </li>
        </template>

      </ul>
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
import { CheckIcon, ChevronUpDownIcon, PlusIcon } from '@heroicons/vue/24/outline'
import type {SelectOption, SelectSearcher} from "~/types/common";
import {HandledRequestError} from "~/exceptions/HandledRequestError";

const props = withDefaults(defineProps<{
  name: string
  searcher: SelectSearcher
  label?: string
  id?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  disableEmpty?: boolean
  disableAutofocus?: boolean
  disableScroll?: boolean
  allowCreate?: boolean
  minQuery?: number
  emptyLabel?: string
  createLabel?: string
}>(), {
  required: false,
  disabled: false,
  disableEmpty: false,
  disableAutofocus: false,
  disableScroll: false,
  allowCreate: false,
})

const emit = defineEmits<{
  (e: 'create'): void,
  (e: 'change', value: null | string | number, option: SelectOption | null): void
}>()

const toaster = useToaster()
const { t } = useI18n()

const buttonElement = ref<HTMLElement | null>(null)
const listElement = ref<HTMLElement | null>(null)
const searchElement = ref<HTMLElement | null>(null)

const opened = ref<boolean>(false)
const loading = ref<boolean>(false)

const model = defineModel<null | string | number>({default: null, required: false})
const selectedOption = ref<SelectOption | null>(null)

const inputId = computed<string>(() => props.id || _.kebabCase(props.name))
const search = ref<null | string>(null)
const options = ref<SelectOption[]>([])

const selectedLabel = computed<string | null>(() => {
  return selectedOption.value ? renderOption(selectedOption.value) : null
})

function handleClickOutside(e: MouseEvent): void {
  const target = e.target as HTMLElement

  if (
      target !== listElement.value &&
      target !== buttonElement.value &&
      !listElement.value?.contains(target) &&
      !buttonElement.value?.contains(target)
  ) {
    close()
  }
}

function handleEscape(e: KeyboardEvent): void {
  if (e.key === 'Escape' && opened.value) {
    close()
  }
}

function performSearch(q: string | null): void {
  // query does not satisfy the minQuery prop,
  // remove all options and keep only the selected one
  if (props.minQuery && (! q || q.length < props.minQuery)) {
    options.value = selectedOption.value ? [selectedOption.value] : []

    return
  }

  // start loading immediately, it
  // will end when debounced fn ends
  loading.value = true

  debouncedHandleSearch(q)
}

async function handleSearch(q: string | null): Promise<void> {
  let newOptions = await loadOptions(q)

  // user already selected a value, and we need
  // to keep this value visible, prepend it to
  // the start of the list and filter duplicates
  // out of the API results
  if (selectedOption.value) {
    newOptions = [selectedOption.value!, ...newOptions.filter(item => item.value !== selectedOption.value!.value)]
  }

  options.value = newOptions
}

const debouncedHandleSearch = _.debounce(handleSearch, 500)

async function loadOptions(q: string | null): Promise<SelectOption[]> {
  try {
    return await props.searcher(q)
  } catch (e) {
    if (e instanceof HandledRequestError) {
      return []
    }

    await toaster.serverError()

    return []
  } finally {
    loading.value = false
  }
}

function handleClick(option: SelectOption): void {
  const selected = isSelected(option)

  // cannot unselect item if empty
  // is disabled
  if (selected && props.disableEmpty) {
    close()

    return
  }

  const newValue = selected ? null : option.value

  selectedOption.value = newValue === null ? null : option
  model.value = newValue

  emit('change', newValue, newValue === null ? null : option)

  close()
}

function toggle(): void {
  // user should not be able to toggle
  // the list when select is disabled
  if (props.disabled) {
    return
  }

  opened.value ? close() : open()
}

function open(): void {
  // show list
  opened.value = true

  // add event listener for clicking outside
  document.addEventListener('click', handleClickOutside, true)

  // add event listener for esc key
  document.addEventListener('keydown', handleEscape, true)

  // wait for list to render and then focus
  // search field if needed and scroll to view
  nextTick(() => {
    // focus search element if needed
    if (! props.disableAutofocus) {
      searchElement.value?.focus()
    }

    // scroll into view
    if (! props.disableScroll) {
      listElement.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  })
}

function close(): void {
  // close list
  opened.value = false

  // remove event listener for clicking outside
  document.removeEventListener('click', handleClickOutside, true)

  // remove event listener for esc key
  document.removeEventListener('keydown', handleEscape, true)
}

function isSelected(option: SelectOption): boolean {
  return option.value === model.value
}

function renderOption(option: SelectOption): string {
  return option.translate ? translate(option.label) : option.label
}

function underlyingSelectFocused(): void {
  buttonElement.value?.focus()
}

function handleCreate(): void {
  // close the dropdown
  close()

  // emit create event
  emit('create')
}

function getSelectedLabel(): string | null {
  return selectedOption.value ? renderOption(selectedOption.value) : null
}

function setValue(option: SelectOption | null): void {
  if (option === null) {
    model.value = null
    selectedOption.value = null

    return
  }

  model.value = option.value
  selectedOption.value = option
}

watch(() => search.value, performSearch)
watch(() => opened.value, (val) => {
  if (val) {
    performSearch(null)
  }
}, { once: true })

defineExpose<{
  getSelectedLabel: () => string | null
  setValue: (option: SelectOption | null) => void
}>({
  getSelectedLabel,
  setValue,
})
</script>