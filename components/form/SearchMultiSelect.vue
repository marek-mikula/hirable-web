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

    <!-- input wrapper -->
    <div class="space-x-2 flex items-center">

      <!-- main input element -->
      <div class="relative min-w-0 flex-1">

        <!-- select for native input validation -->
        <select
            v-model="model"
            class="absolute block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-primary-600 text-sm"
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
              'flex items-center space-x-1 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed',
              error ? 'text-red-900 ring-red-300 focus:ring-red-600' : 'text-gray-900 ring-gray-300 focus:ring-primary-600',
          ]"
            :disabled="disabled"
            @click="toggle"
        >

          <!-- selected text -->
          <span class="block truncate flex-1">
          {{ selectedLabel ?? emptyLabel ?? $t('form.select.chooseOption') }}
        </span>

          <!-- selected options counter -->
          <span v-if="model.length > 1" class="py-0.25 px-1.5 rounded-md bg-gray-50 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset" v-tooltip="{ content: $t('form.select.numSelectedOptions') }">
          {{ model.length }}
        </span>

          <!-- select-like icon -->
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon :class="[error ? 'text-red-900' : 'text-gray-400', 'size-5']"/>
        </span>

        </button>

        <ul
            v-if="opened"
            ref="listElement"
            class="absolute z-[125] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-1 text-base border border-gray-200 shadow-sm focus:outline-none sm:text-sm"
            tabindex="-1"
            role="listbox"
        >

          <!-- search input element -->
          <li class="sticky -top-1 z-[125]">
            <input
                ref="searchElement"
                v-model="search"
                type="text"
                tabindex="0"
                name="q"
                :placeholder="minQuery ? $t('form.select.searchMin', {n: minQuery}) : $t('form.select.search')"
                class="block w-[calc(100%+0.5rem)] focus:ring-0 focus:border-gray-200 text-sm py-1.5 px-3 text-gray-700 bg-white border-0 border-b border-gray-200 sticky -top-1 -mt-1 mb-1 -mx-1 z-[125] placeholder-gray-400 focus:outline-none"
            >
          </li>

          <!-- create option -->
          <li v-if="allowCreate && search" class="group/option text-gray-900 relative cursor-pointer select-none py-1.5 px-2 pr-7 rounded-md hover:bg-gray-50" @click="handleCreate">
          <span class="block text-sm">
            {{ $t('form.select.create', { item: search }) }}
          </span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2">
            <PlusIcon class="size-5"/>
          </span>
          </li>

          <li
              v-if="! props.disableEmpty && model.length > 1 && !search"
              class="text-gray-900 cursor-pointer select-none py-1.5 px-2 pr-7 rounded-md hover:bg-gray-50 text-sm flex items-center space-x-1"
              @click="unselectAll"
          >
            <XMarkIcon class="size-4"/>
            <span>{{ $t('form.select.unselectAll') }}</span>
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
              >
              <span :class="[isSelected(option) ? 'font-semibold' : '', 'block text-sm']">
                {{ translateOption(option) }}
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

      <slot name="after"/>

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
import { XMarkIcon, CheckIcon, ChevronUpDownIcon, PlusIcon } from '@heroicons/vue/24/outline'
import type {SelectOption, SelectSearcher} from "~/types/common";
import { createPopper } from "@popperjs/core";
import type { Instance, Placement } from "@popperjs/core";

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
  max?: number
  allowCreate?: boolean
  minQuery?: number
  emptyLabel?: string
  placement?: Placement
}>(), {
  required: false,
  disabled: false,
  disableEmpty: false,
  disableAutofocus: false,
  disableScroll: false,
  allowCreate: false,
  placement: 'bottom'
})

const emit = defineEmits<{
  (e: 'create', value: string): void,
  (e: 'change', value: (string | number)[], options: SelectOption[]): void
}>()

const toaster = useToaster()

const buttonElement = ref<HTMLElement | null>(null)
const listElement = ref<HTMLElement | null>(null)
const searchElement = ref<HTMLElement | null>(null)

const opened = ref<boolean>(false)
const loading = ref<boolean>(false)
const popper = ref<Instance|null>(null)

const model = defineModel<(string | number)[]>({default: [], required: false})
const selectedOptions = ref<SelectOption[]>([])

const inputId = computed<string>(() => props.id || _.kebabCase(props.name))
const search = ref<null | string>(null)
const options = ref<SelectOption[]>([])
const createdOptions = ref<SelectOption[]>([])

const selectedLabel = computed<string | null>(() => {
  if (selectedOptions.value.length === 0) {
    return null
  }

  return selectedOptions.value
      .map(option => option ? translateOption(option) : '')
      .join(', ')
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
    options.value = selectedOptions.value

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
  if (selectedOptions.value.length > 0) {
    newOptions = [...selectedOptions.value, ...newOptions.filter(item => !selectedOptions.value.some(i => i.value === item.value))]
  }

  // prepend created options, so they
  // are not lost when searching, also
  // filter duplicates if any on created
  // options are selected
  if (createdOptions.value.length > 0) {
    newOptions = [...createdOptions.value.filter(item => !selectedOptions.value.some(i => i.value === item.value)), ...newOptions]
  }

  options.value = newOptions
}

const debouncedHandleSearch = _.debounce(handleSearch, 500)

async function loadOptions(q: string | null): Promise<SelectOption[]> {
  const result = await handle<SelectOption[]>(async () => {
    return props.searcher(q);
  })

  loading.value = false

  return result.success ? result.result : []
}

function handleClick(option: SelectOption): void {
  const selected = isSelected(option)

  // cannot unselect the last item
  // if empty is disabled
  if (selected && props.disableEmpty && model.value.length === 1) {
    return
  }

  if (selected) {
    model.value = model.value.filter(item => item !== option.value)
    selectedOptions.value = selectedOptions.value.filter(item => item.value !== option.value)
  } else if (props.max && model.value.length >= props.max) {
    model.value = [...model.value.slice(1), option.value]
    selectedOptions.value = [...selectedOptions.value.slice(1), option]
  } else {
    model.value = [...model.value, option.value]
    selectedOptions.value = [...selectedOptions.value, option]
  }

  emit('change', model.value, selectedOptions.value)
}

function initPopper(): Instance {
  return createPopper(buttonElement.value!, listElement.value!, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      },
      {
        // this modifier handles the width
        // matching between the list and
        // the button
        name: 'width',
        enabled: true,
        phase: 'beforeWrite',
        fn({state}) {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect({state}) {
          state.elements.popper.style.width = `${buttonElement.value!.clientWidth}px`;
        }
      }
    ]
  })
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

  // wait for list to render and then
  // create popper instance and focus
  // search field if needed and scroll
  // to view
  nextTick(() => {
    popper.value = initPopper()

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

  // destroy popper instance
  popper.value?.destroy()
}

function unselectAll(): void {
  if (props.disableEmpty) {
    return
  }

  model.value = []
  selectedOptions.value = []

  emit('change', [], [])
}

function isSelected(option: SelectOption): boolean {
  return model.value.includes(option.value)
}

function underlyingSelectFocused(): void {
  buttonElement.value?.focus()
}

function handleCreate(): void {
  const value = search.value

  if (!value) {
    return
  }

  const exists = options.value.findIndex(item => item.value === value)

  // value already exists in the array
  if (exists > -1) {
    return
  }

  const option = { value, label: value }

  // push the value to the created options array
  createdOptions.value.push(option)

  // push the value to the options array
  options.value = [option, ...options.value]

  // emit create event
  emit('create', value)
}

watch(() => search.value, performSearch)
watch(() => opened.value, (val) => {
  if (val) {
    performSearch(null)
  }
}, { once: true })
</script>