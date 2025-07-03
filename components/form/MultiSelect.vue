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
          v-model="underlyingValue"
          class="absolute block w-full rounded-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-primary-600 text-sm"
          tabindex="-1"
          :required="required"
          :disabled="disabled"
          @focus="underlyingSelectFocused"
      >
        <option :value="underlyingValue || 'none'">-</option>
      </select>

      <button
          :id="inputId"
          ref="buttonElement"
          :name="name"
          type="button"
          :class="[
              'flex items-center space-x-1 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 focus:outline-hidden focus:ring-2 focus:ring-primary-600 text-sm disabled:opacity-75 disabled:cursor-not-allowed',
              error ? 'text-red-900 ring-red-300 focus:ring-red-600' : 'text-gray-900 ring-gray-300 focus:ring-primary-600',
          ]"
          :disabled="disabled"
          @click="toggle"
      >

        <!-- selected text -->
        <span class="block truncate flex-1">
          {{ selectedLabel || emptyLabel || $t('form.select.chooseOptions') }}
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
    </div>

    <!-- error container -->
    <p v-if="error" class="text-xs text-red-400">
      {{ error }}
    </p>

    <!-- hint container -->
    <p v-else-if="hint" class="text-xs text-gray-400">
      {{ hint }}
    </p>

    <Teleport to="#teleports">
      <ul
          v-if="opened"
          ref="listElement"
          class="absolute z-[125] mt-1 max-h-60 overflow-auto rounded-md bg-white p-1 text-base border border-gray-200 shadow-xs focus:outline-hidden sm:text-sm"
          tabindex="-1"
          role="listbox"
      >

        <!-- search input element -->
        <li class="sticky -top-1 z-[125]">
          <input
              v-if="! hideSearch"
              ref="searchElement"
              v-model="search"
              type="text"
              tabindex="0"
              name="q"
              :placeholder="$t('form.select.search')"
              class="block w-[calc(100%+0.5rem)] focus:ring-0 focus:border-gray-200 text-sm py-1.5 px-3 text-gray-700 bg-white border-0 border-b border-gray-200 sticky -top-1 -mt-1 mb-1 -mx-1 z-[125] placeholder-gray-400 focus:outline-hidden"
          >
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

        <template v-else-if="visibleOptions.length > 0">
          <li
              v-for="option in visibleOptions"
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
          <li v-if="search" class="text-gray-900 py-1.5 px-2 text-sm">
            {{ $t('form.select.noOptionsQuery', {q: search}) }}
          </li>
          <li v-else class="text-gray-900 py-1.5 px-2 text-sm">
            {{ $t('form.select.noOptions') }}
          </li>
        </template>

      </ul>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import type {SelectOption, SelectOptionLoader} from "~/types/common";
import { createPopper } from "@popperjs/core";
import type { Instance, Placement } from "@popperjs/core";
import type {MultiSelectValue} from "~/types/components/form/multiSelect.types";

const props = withDefaults(defineProps<{
  name: string
  options?: SelectOption[]
  optionLoader?: SelectOptionLoader
  label?: string
  id?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  hideSearch?: boolean
  disableEmpty?: boolean
  disableAutofocus?: boolean
  disableScroll?: boolean
  max?: number
  searchIn?: string[]
  emptyLabel?: string
  placement?: Placement
}>(), {
  required: false,
  disabled: false,
  hideSearch: false,
  disableEmpty: false,
  disableAutofocus: false,
  disableScroll: false,
  searchIn: () => ['label'],
  placement: 'bottom',
})

const emit = defineEmits<{
  (e: 'change', value: MultiSelectValue): void
}>()

const buttonElement = ref<HTMLElement | null>(null)
const listElement = ref<HTMLElement | null>(null)
const searchElement = ref<HTMLElement | null>(null)

const opened = ref<boolean>(false)
const search = ref<null | string>(null)
const popper = ref<Instance|null>(null)
const loading = ref<boolean>(false)
const options = ref<SelectOption[]>(props.options ?? [])
const optionsLoaded = ref<boolean>(false)

const model = defineModel<MultiSelectValue>({default: [], required: false})

const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

const selectedLabel = computed<string | null>(() => {
  if (model.value.length === 0) {
    return null
  }

  return model.value
      .map(val => options.value.find(option => option.value === val)!)
      .map(option => option ? translateOption(option) : '')
      .join(', ')
})

const visibleOptions = computed<SelectOption[]>(() => {
  // searching is not enabled or
  // nothing has been searched
  if (props.hideSearch || ! search.value) {
    return options.value
  }

  return options.value.filter(option => {
    return props.searchIn.some(attr => searchInString(_.get(option, attr), search.value!))
  })
})

const underlyingValue = computed<null | string | number>(() => {
  return model.value.length > 0 ? model.value[0] : null
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

function handleClick(option: SelectOption): void {
  const selected = isSelected(option)

  // cannot unselect the last item
  // if empty is disabled
  if (selected && props.disableEmpty && model.value.length === 1) {
    return
  }

  if (selected) {
    model.value = model.value.filter(item => item !== option.value)
  } else if (props.max && model.value.length >= props.max) {
    model.value = [...model.value.slice(1), option.value]
  } else {
    model.value = [...model.value, option.value]
  }

  emit('change', model.value)
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

async function loadOptions(loader: SelectOptionLoader): Promise<void> {
  loading.value = true

  await handle(async () => {
    options.value = await loader()
    optionsLoaded.value = true
  }, () => {
    optionsLoaded.value = false

    // close select
    if (opened.value) {
      close()
    }

    return false
  })

  loading.value = false
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
    if (! props.disableAutofocus && ! props.hideSearch) {
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

  // if async getter is passed as options, try
  // to load the options
  if (props.optionLoader && !optionsLoaded.value) {
    loadOptions(props.optionLoader)
  }
}

function close(): void {
  // clear search input
  search.value = null

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

  emit('change', [])
}

function isSelected(option: SelectOption): boolean {
  return model.value.includes(option.value)
}

function underlyingSelectFocused(): void {
  buttonElement.value?.focus()
}
</script>