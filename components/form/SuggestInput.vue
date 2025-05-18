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

    <div :class="[icon ? 'relative rounded-md' : '']">

      <!-- icon -->
      <div v-if="icon" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <component :is="icon" class="size-5 text-gray-400"/>
      </div>

      <!-- main input element -->
      <input
          :id="inputId"
          v-model="model"
          :name="name"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          :maxlength="maxlength"
          :required="required"
          :disabled="disabled"
          :class="[
            'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm disabled:opacity-75 disabled:cursor-not-allowed',
            error ? 'text-red-900 placeholder:text-red-300 ring-red-300 focus:ring-red-600' : 'text-gray-900 placeholder:text-gray-400 ring-gray-300 focus:ring-primary-600',
            icon ? 'pl-10' : '',
          ]"
          type="text"
          ref="inputElement"
          @change="onChange"
          @input="onInput"
          @focus="onFocus"
      >

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
          class="absolute z-[125] mt-1 max-h-60 overflow-auto rounded-md bg-white p-1 text-base border border-gray-200 shadow-sm focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
      >

        <li v-if="loading" class="text-gray-900 py-1.5 px-2 text-sm">
          <CommonLoader/>
        </li>

        <template v-else-if="options.length > 0">
          <li
              v-for="(option, index) in options"
              :key="index"
              class="group/option block text-sm text-gray-900 relative cursor-pointer select-none py-1.5 px-2 pr-7 rounded-md hover:bg-gray-50"
              role="option"
              @click="handleClick(option)"
          >
            {{ option }}
          </li>
        </template>

        <!-- empty state -->
        <template v-else>
          <li class="text-gray-900 py-1.5 px-2 text-sm">
            Žádné doporučené hodnoty
          </li>
        </template>

      </ul>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type {AnyComponent, InputSuggester} from "~/types/common";
import type { Instance, Placement } from "@popperjs/core";
import {createPopper} from "@popperjs/core";

const props = withDefaults(defineProps<{
  name: string
  suggester: InputSuggester
  label?: string
  id?: string
  autocomplete?: string
  maxlength?: number
  placeholder?: string
  hint?: string
  error?: string | null
  required?: boolean
  disabled?: boolean
  disableScroll?: boolean
  icon?: AnyComponent
  placement?: Placement
}>(), {
  autocomplete: 'none', // turn off autocomplete
  required: false,
  disabled: false,
  disableScroll: false,
  placement: 'bottom'
})

const emit = defineEmits<{
  (e: 'change' | 'input', value: string | number | null, event: Event): void
}>()

const inputElement = ref<HTMLElement | null>(null)
const listElement = ref<HTMLElement | null>(null)

const opened = ref<boolean>(false)
const popper = ref<Instance|null>(null)
const loading = ref<boolean>(false)
const options = ref<string[]>([])

const model = defineModel<string | null>({
  default: null,
  required: false,
  set(value) {
    return value === '' ? null : value
  }
})
const inputId = computed<string>(() => props.id || _.kebabCase(props.name))

function handleClickOutside(e: MouseEvent): void {
  const target = e.target as HTMLElement

  if (
      target !== listElement.value &&
      target !== inputElement.value &&
      !listElement.value?.contains(target) &&
      !inputElement.value?.contains(target)
  ) {
    close()
  }
}

function handleEscape(e: KeyboardEvent): void {
  if (e.key === 'Escape' && opened.value) {
    close()
  }
}

function handleClick(option: string): void {
  model.value = option
  close()
}

function initPopper(): Instance {
  return createPopper(inputElement.value!, listElement.value!, {
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
          state.elements.popper.style.width = `${inputElement.value!.clientWidth}px`;
        }
      }
    ]
  })
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

    // scroll into view
    if (! props.disableScroll) {
      console.log(listElement.value)


      // listElement.value?.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'center'
      // })
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

async function handleSearch(): Promise<void> {
  await handle(async () => {
    options.value = await props.suggester(model.value)
  }, () => {
    // close suggester
    if (opened.value) {
      close()
    }

    return false
  })

  loading.value = false
}

const debouncedHandleSearch = _.debounce(handleSearch, 500)

function handleSuggestion(): void {
  if (!opened.value) {
    open()
  }

  // start loading immediately, it
  // will end when debounced fn ends
  loading.value = true

  debouncedHandleSearch()
}

function onFocus(): void {
  // do not trigger suggestion
  // when user focuses already
  // opened input
  if (opened.value) {
    return
  }

  handleSuggestion()
}

function onChange(event: Event): void {
  emit('change', model.value, event)
}

function onInput(event: Event): void {
  emit('input', model.value, event)

  handleSuggestion()
}
</script>