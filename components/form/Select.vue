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
          {{ selectedLabel ?? emptyLabel ?? $t('form.select.chooseOption') }}
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
          class="z-[125] max-h-60 overflow-auto rounded-md bg-white p-1 pt-0 text-base border border-gray-200 shadow-sm focus:outline-none sm:text-sm"
          ref="listElement"
          tabindex="-1"
          role="listbox"
      >

        <!-- search input element -->
        <li class="sticky top-0 z-[125]">
          <input
              v-if="! hideSearch"
              ref="searchElement"
              v-model="search"
              type="text"
              tabindex="0"
              name="q"
              :placeholder="$t('form.select.search')"
              class="block w-[calc(100%+0.5rem)] focus:ring-0 focus:border-gray-200 text-sm py-1.5 px-3 text-gray-700 bg-white border-0 border-b border-gray-200 sticky -top-1 -mt-1 mb-1 -mx-1 z-[125] placeholder-gray-400 focus:outline-none"
          >
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
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'
import type {SelectOption, SelectOptionLoader} from "~/types/common";
import { createPopper } from "@popperjs/core";
import type { Instance, Placement } from "@popperjs/core";

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
  placement: 'bottom'
})

const emit = defineEmits<{
  (e: 'change', value: null | string | number, option: SelectOption | null): void
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

const model = defineModel<null | string | number>({default: null, required: false})

const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

const selectedLabel = computed<string | null>(() => {
  const option = model.value ? options.value.find(item => item.value === model.value) : null
  return option ? renderOption(option) : null
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

  // cannot unselect item if empty
  // is disabled
  if (selected && props.disableEmpty) {
    close()

    return
  }

  const newValue = selected ? null : option.value

  model.value = newValue

  emit('change', newValue, newValue === null ? null : option)

  close()
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
  }, (e: any) => {
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

function isSelected(option: SelectOption): boolean {
  return option.value === model.value
}

function renderOption(option: SelectOption): string {
  return option.translate ? translate(option.label) : option.label
}

function underlyingSelectFocused(): void {
  buttonElement.value?.focus()
}
</script>