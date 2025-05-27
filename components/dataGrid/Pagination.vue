<template>
  <div>
    <div class="flex flex-1 justify-between sm:hidden space-x-2">
      <CommonButton
          variant="secondary"
          :label="$t('common.table.previous')"
          @click="onPreviousPage"
      />
      <CommonButton
          variant="secondary"
          :label="$t('common.table.next')"
          @click="onNextPage"
      />
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

          <!-- back button -->
          <button
              :disabled="pagination.currentPage === 1"
              type="button"
              class="relative inline-flex items-center rounded-l-md p-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              @click="onPreviousPage"
          >
            <ChevronLeftIcon class="size-5"/>
          </button>

          <template v-for="(page, index) in pages" :key="index">
            <span
                v-if="page === null"
                class="relative inline-flex items-center py-1.5 px-3 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            >
              ...
            </span>
            <button
                v-else
                type="button"
                :class="[
                    'relative items-center py-1.5 px-3 text-sm font-semibold focus:z-20',
                    page === pagination.currentPage ? 'z-10 bg-primary-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
                ]"
                @click="onChangePage(page)"
            >
              {{ page }}
            </button>
          </template>

          <!-- forward button -->
          <button
              :disabled="pagination.currentPage === pagination.lastPage"
              type="button"
              class="relative inline-flex items-center rounded-r-md p-1.5 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              @click="onNextPage"
          >
            <ChevronRightIcon class="size-5"/>
          </button>
        </nav>
      </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline";
import type {PaginationMeta} from "~/repositories/resources";
import _ from "lodash";

const props = defineProps<{
  pagination: PaginationMeta
}>()

const emit = defineEmits<{
  (e: 'changePage', page: number): void
}>()

const pages = computed<(number | null)[]>(() => {
  const step = 2
  const page = props.pagination.currentPage

  const fPage = 1
  const lPage = props.pagination.lastPage

  let result: (number | null)[]

  if ((fPage + 2) < (page - step)) {
    result = [1, null, ..._.times(step, i => page - (2 - i))]
  } else {
    result = [..._.times(page - 1, i => i + 1)]
  }

  // add current page
  result.push(page)

  if ((lPage - 2) > (page + step)) {
    result = [...result, ..._.times(step, i => page + i + 1), null, lPage]
  } else {
    result = [...result, ..._.times(lPage - page, i => page + i + 1)]
  }

  return result
})

function onChangePage(page: number): void {
  if (page === props.pagination.currentPage) {
    return
  }

  emit('changePage', page)
}

function onNextPage(): void {
  if (props.pagination.currentPage === props.pagination.lastPage) {
    return
  }

  emit('changePage', props.pagination.currentPage + 1)
}

function onPreviousPage(): void {
  if (props.pagination.currentPage === 1) {
    return
  }

  emit('changePage', props.pagination.currentPage - 1)
}
</script>
