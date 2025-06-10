<template>
  <div class="space-y-2">
    <div v-if="gridLoading" class="space-y-2">
      <div class="flex items-center space-x-2">
        <div class="h-[32px] animate-pulse bg-gray-100 rounded-md w-[10%]"></div>
        <div class="h-[32px] animate-pulse bg-gray-100 rounded-md flex-1"></div>
      </div>
      <div class="h-[300px] animate-pulse bg-gray-100 rounded-md"></div>
    </div>

    <div v-else-if="grid" class="space-y-2">

      <!-- filter, search and actions -->
      <div v-if="grid.allowFilter || grid.allowSearch || $slots.actions" class="flex items-center space-x-2">

        <!-- filter button to show modal -->
        <CommonIndicator v-if="grid.allowFilter" variant="primary" :number="5">
          <CommonButton variant="secondary" :disabled="dataLoading" class="flex items-center space-x-1" @click="filterModalOpened = true">
            <FunnelIcon class="size-5"/>
            <span>
              {{ $t('modal.grid.filter.title') }}
            </span>
          </CommonButton>
        </CommonIndicator>

        <!-- search bar with only one-way binding -->
        <FormInput
            v-if="grid.allowSearch"
            type="search"
            name="name"
            class="flex-1"
            :model-value="query.searchQuery"
            :icon="MagnifyingGlassIcon"
            :disabled="dataLoading"
            :placeholder="$t('common.action.search')"
            @input="debouncedOnSearch"
        />

        <!-- custom action buttons -->
        <slot name="actions" v-bind="{ dataLoading }"/>

      </div>

      <div class="border border-gray-300 rounded-md overflow-hidden">

        <!-- table -->
        <div class="max-h-[560px] relative overflow-scroll">
          <table class="min-w-full table-fixed border-spacing-0 border-separate">

            <thead :class="{
              'sticky top-0 z-20': grid.stickyHeader
            }">
            <tr>
              <!-- select all rows checkbox -->
              <th v-if="grid.actions.length > 0" data-col="select-all" class="shadow-sm bg-gray-100 border-gray-300 border-b border-r truncate px-4 py-2 text-left text-sm font-semibold text-gray-900">
                <FormCheckbox
                    v-model="selectAll"
                    :name="`grid-${identifier}-select-all`"
                    :disabled="dataLoading"
                    @change="onSelectAll"
                />
              </th>

              <!-- header columns -->
              <th
                  v-for="(column, index) in visibleColumns"
                  :key="column.key"
                  :data-col="`column-${column.key}`"
                  :class="['shadow-sm relative bg-gray-100 border-gray-300 border-b truncate px-4 py-2 text-left text-sm font-semibold text-gray-900', {
                    'border-r': index < (visibleColumns.length - 1)
                  }]"
                  :style="grid.allowSettings && column.width !== null ? {
                    width: `${column.width}px`,
                    minWidth: `${column.width}px`,
                    maxWidth: `${column.width}px`,
                  } : {}"
              >
                <div class="flex items-center space-x-2">

                  <!-- loading spinner with column label -->
                  <span>
                    <CommonSpinner v-if="columnLoading === column.key" size="size-5"/>
                    <span v-else>{{ $t(column.label) }}</span>
                  </span>

                  <!-- sort button -->
                  <template v-if="column.allowSort">

                    <!-- default state: sort asc -->
                    <template v-if="_.get(query.sort, column.key) === undefined">
                      <CommonButton variant="secondary" :disabled="dataLoading" :size="2" symmetrical v-tooltip="{ placement: 'top', content: $t('tooltip.table.sort.asc') }" @click="onSort(column)">
                        <MinusIcon class="size-3"/>
                      </CommonButton>
                    </template>

                    <!-- asc sorted: sort desc -->
                    <template v-else-if="_.get(query.sort, column.key) === ORDER.ASC">
                      <CommonButton variant="primary" :disabled="dataLoading" :size="2" symmetrical v-tooltip="{ placement: 'top', content: $t('tooltip.table.sort.desc') }" @click="onSort(column)">
                        <ArrowUpIcon class="size-3"/>
                      </CommonButton>
                    </template>

                    <!-- desc sorted: cancel sorting -->
                    <template v-else>
                      <CommonButton variant="primary" :disabled="dataLoading" :size="2" symmetrical v-tooltip="{ placement: 'top', content: $t('tooltip.table.sort.default') }" @click="onSort(column)">
                        <ArrowDownIcon class="size-3"/>
                      </CommonButton>
                    </template>

                  </template>

                  <!-- column width resizer -->
                  <span v-if="grid.allowSettings" class="absolute rounded-full right-1 top-1 bottom-1 w-[2px] bg-gray-200 hover:bg-gray-500 cursor-col-resize" @mousedown="onResizeColumn($event, column)"/>

                </div>
              </th>
            </tr>
            </thead>

            <tbody class="relative">
            <!-- loading overlay -->
            <tr v-if="dataLoading && initialized" class="absolute w-full h-full bg-white/80 z-10 animate-pulse"></tr>

            <!-- initial loading skeleton -->
            <tr v-if="! initialized">
              <td v-for="n in (visibleColumns.length + (grid.actions.length > 0 ? 1 : 0))" :key="n" class="border-gray-300 truncate px-4 py-2 text-sm text-gray-900">
                <div class="h-6 w-full bg-gray-100 animate-pulse rounded-md"></div>
              </td>
            </tr>

            <!-- empty message -->
            <tr v-else-if="data.length === 0 && initialized">
              <td :colspan="visibleColumns.length + (grid.actions.length > 0 ? 1 : 0)" class="truncate px-4 py-2 text-sm text-gray-900">
                {{ $t('common.table.noData') }}
              </td>
            </tr>

            <!-- table data -->
            <tr v-for="(item, index) in data" :key="_.get(item, grid.keyAttribute)" :class="['hover:bg-gray-50', {
              'hover:cursor-pointer': hasRowLinks
            }]" @click="(event) => onRowClick(event, item)">

              <!-- checkbox to select current row -->
              <td v-if="grid.actions.length > 0" data-col="select-all" :class="['border-gray-300 truncate px-4 py-2 text-sm text-gray-900', {
                'border-b': index < (data.length - 1),
              }]">
                <FormCheckbox
                    :model-value="selected.includes(_.get(item, grid.keyAttribute))"
                    :name="`grid-${identifier}-select-${_.get(item, grid.keyAttribute)}`"
                    @change="(value, event) => onSelect(item, value, event)"
                />
              </td>

              <!-- row column -->
              <td
                  v-for="column in visibleColumns"
                  :key="column.key"
                  :data-col="`column-${column.key}`"
                  :class="['border-gray-300 truncate px-4 py-2 text-sm text-gray-900', {
                    'border-b': index < (data.length - 1),
                  }]"
                  :style="grid.allowSettings && column.width !== null ? {
                    width: `${column.width}px`,
                    minWidth: `${column.width}px`,
                    maxWidth: `${column.width}px`,
                  } : {}"
              >
                <slot :name="`${column.key}Slot`" v-bind="{column, item}">
                  <span>{{ _.get(item, column.key) || '-'}}</span>
                </slot>
              </td>

            </tr>
            </tbody>

            <!-- table footer for mass actions -->
            <tfoot v-if="grid.actions.length > 0 && selected.length > 0" :class="{
              'sticky bottom-0 z-20': grid.stickyFooter
            }">
            <tr>
              <td colspan="101" class="border-t border-gray-300 px-4 py-2 text-sm bg-gray-100">
                <div class="flex items-center space-x-2">
                  <div class="bg-white flex items-center ring-1 ring-inset ring-gray-300 rounded-md divide-x divide-gray-300">
                    <div class="py-1.5 px-3">
                      {{ $t('common.table.selected', { n: selected.length }) }}
                    </div>
                    <div class="py-1.5 px-3 font-semibold">
                      {{ selected.length }}
                    </div>
                  </div>
                  <FormBasicSelect
                      v-model="action"
                      :name="`grid-${identifier}-action`"
                      class="w-40"
                      :options="grid.actions.map(item => ({value: item.key, label: item.label}))"
                      add-empty-option
                  />
                  <CommonButton
                      variant="secondary"
                      :disabled="! action"
                      :label="$t('common.action.ok')"
                      @click="onAction"
                  />
                  <CommonButton
                      variant="danger"
                      :label="$t('common.action.cancel')"
                      @click="onActionCanceled"
                  />
                </div>
              </td>
            </tr>
            </tfoot>

          </table>
        </div>

        <!-- settings button and pagination -->
        <div class="p-4 py-3 border-t border-gray-300 flex items-center justify-between space-x-2">

          <div class="flex items-center space-x-2 truncate">
            <CommonButton v-if="grid.allowSettings" variant="secondary" :disabled="dataLoading" symmetrical @click="settingsModalOpened = true" v-tooltip="{ content: $t('tooltip.table.settings') }">
              <Cog6ToothIcon class="size-5"/>
            </CommonButton>
            <div v-if="dataLoading" class="text-sm text-gray-700">
              <CommonLoader :label="$t('common.table.loadingData')"/>
            </div>
            <div v-else-if="pagination && pagination.total > 0" class="truncate">
              <i18n-t keypath="common.table.resultsNumber" tag="p" scope="global" class="text-sm text-gray-700 truncate">
                <template #from>
                    <span class="font-semibold">
                      {{ pagination.from }}
                    </span>
                </template>
                <template #to>
                    <span class="font-semibold">
                      {{ pagination.to }}
                    </span>
                </template>
                <template #total>
                    <span class="font-semibold">
                      {{ pagination.total }}
                    </span>
                </template>
              </i18n-t>
            </div>
          </div>

          <LazyDataGridPagination v-if="pagination" :pagination="pagination" @changePage="onChangePage"/>
        </div>

      </div>

      <!-- settings modal -->
      <LazyDataGridSettingsModal
          v-if="grid.allowSettings"
          :grid="grid"
          :open="settingsModalOpened"
          @close="settingsModalOpened = false"
          @update="onSettingsUpdated"
      />

      <!-- filter modal -->
      <LazyDataGridFilterModal
        v-if="grid.allowFilter"
        :grid="grid"
        :open="filterModalOpened"
        @close="filterModalOpened = false"
      />

    </div>

    <CommonError v-else/>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cog6ToothIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  MinusIcon,
} from "@heroicons/vue/24/outline";
import type {GRID} from "~/types/enums";
import type {Grid, GridColumn, GridQuery, PaginationMeta} from "~/repositories/resources";
import type {StringMap} from "~/types/common";
import type {LocationQuery} from "vue-router";
import {ORDER} from "~/types/enums";
import type {
  DataGridActionHandler,
  DataGridCallee,
  DataGridClicker,
  DataGridTableExpose,
  GridQueryString
} from "~/types/components/dataGrid/table.types";
import type {NavigateToOptions} from "nuxt/dist/app/composables/router";

const props = defineProps<{
  identifier: GRID
  callee: DataGridCallee
  handlers?: StringMap<DataGridActionHandler>
  clicker?: DataGridClicker
}>()

const api = useApi()
const toaster = useToaster()
const route = useRoute()

const initialized = ref<boolean>(false)

// grid definition, data, pagination and query
const grid = ref<Grid|null>(null)
const data = ref<object[]>([])
const pagination = ref<PaginationMeta|null>(null)
const query = ref<GridQuery>({page: 1, searchQuery: null, sort: {}})

// loaders
const gridLoading = ref<boolean>(true)
const dataLoading = ref<boolean>(false)
const columnLoading = ref<string|null>(null) // column key

// mass actions and row selections
const lastChecked = ref<any|null>(null)
const selectAll = ref<boolean>(false)
const selected = ref<any[]>([])
const action = ref<string|null>(null)

// modal windows
const settingsModalOpened = ref<boolean>(false)
const filterModalOpened = ref<boolean>(false)

const hasRowLinks = computed<boolean>(() => typeof props.clicker !== 'undefined')
const visibleColumns = computed<GridColumn[]>(() => grid.value?.columns.filter(column => column.enabled) ?? [])

function onSelectAll(value: boolean): void {
  selected.value = []

  if (value) {
    for (const item of data.value) {
      selected.value.push(_.get(item, grid.value!.keyAttribute))
    }
  }

  // reset previously checked input
  lastChecked.value = null
}

function onSelect(item: any, value: boolean, event: KeyboardEvent, ignoreShift: boolean = false): void {
  const key = _.get(item, grid.value!.keyAttribute)
  const index = selected.value.indexOf(key)
  const isShiftKey = event.shiftKey
  const previouslyChecked = lastChecked.value

  if (! ignoreShift) {
    // save last checked/unchecked key
    lastChecked.value = key
  }

  if (value) {
    // item is already checked, probably
    // some kind of error => ignore
    if (index > -1) {
      return
    }

    selected.value.push(key)

    // check the select all checkbox
    // if user selected all items
    if (selected.value.length === data.value.length) {
      selectAll.value = true
    }
  } else {
    // item is not selected, probably
    // some kind of error => ignore
    if (index === -1) {
      return
    }

    selected.value.splice(index, 1)

    // uncheck the select all checkbox
    // if user unselected the last item
    if (selected.value.length === 0) {
      selectAll.value = false
    }
  }

  if (ignoreShift || ! isShiftKey || ! previouslyChecked) {
    return
  }

  let startIndex = data.value.findIndex(item => _.get(item, grid.value!.keyAttribute) === previouslyChecked)
  let endIndex = data.value.findIndex(item => _.get(item, grid.value!.keyAttribute) === key)

  if (startIndex === -1 || endIndex === -1 || startIndex === endIndex) {
    return
  }

  // flip indexes if needed, user probably
  // toggled item with higher index first
  // [0]
  // [1]
  // [2] - second click + shift here
  // [3]
  // [4] - first click here
  if (startIndex > endIndex) {
    const cache = startIndex
    startIndex = endIndex
    endIndex = cache
  }

  // check firstly toggled item if it
  // is toggled on or off
  const newValue = selected.value.includes(_.get(data.value[startIndex]!, grid.value!.keyAttribute))

  for (let x = startIndex; x <= endIndex; x++) {
    onSelect(data.value[x]!, newValue, event, true)
  }

  lastChecked.value = null
}

async function onAction(): Promise<void> {
  if (selected.value.length === 0 || ! action.value) {
    return
  }

  if (typeof props.handlers === 'undefined') {
    throw new Error('Missing action handlers.')
  }

  const definition = grid.value!.actions.find(item => item.key === action.value!)!
  const handler = props.handlers[definition.key]

  if (typeof handler === 'undefined') {
    throw new Error(`Missing action handler for action ${definition.key!}.`)
  }

  await handle(async () => {
    await handler(selected.value)

    // clear values
    lastChecked.value = null
    selectAll.value = false
    selected.value = []
    action.value = null

    if (definition.needsRefresh) {
      await loadData()
    }
  })
}

function onActionCanceled(): void {
  lastChecked.value = null
  selectAll.value = false
  selected.value = []
  action.value = null
}

async function onRowClick(event: PointerEvent, item: object): Promise<void> {
  if (! hasRowLinks.value) {
    return
  }

  const selection = window.getSelection()

  // user is trying to select something
  // => disable row click
  if (selection && selection.toString().length > 0) {
    return
  }

  const target = event.target as HTMLElement

  // these elements should be ignored when clicked
  if (['INPUT', 'A', 'BUTTON'].includes(target.tagName)) {
    return
  }

  const routeOrUndefined = props.clicker!(item)

  // some other action has been performed outside
  // (modal, request, etc.)
  if (routeOrUndefined === undefined) {
    return
  }

  const options: NavigateToOptions = { external: false }
  const shouldOpenNewTab = event.shiftKey || event.ctrlKey || event.metaKey

  if (shouldOpenNewTab) {
    options.open = {
      target: '_blank',
      windowFeatures: {
        noopener: true,
        noreferrer: true,
      }
    }
  }

  await navigateTo(routeOrUndefined, options)
}

function onResizeColumn(event: MouseEvent, column: GridColumn): void {
  const target = event.target as HTMLSpanElement
  const columnElement = target.parentElement!.parentElement as HTMLTableCellElement

  const styles = window.getComputedStyle(columnElement)

  // get the current mouse position
  // and current column width
  const x = event.clientX
  const w = parseInt(styles.width, 10)

  const mouseMoveHandler = (e: MouseEvent) => {
    // determine the new width of the column by
    // how far the mouse moved
    const newWidth = w + (e.clientX - x)

    // validate min. width
    if (column.minWidth && (newWidth < column.minWidth)) {
      return
    }

    // validate max. width
    if (column.maxWidth && (newWidth > column.maxWidth)) {
      return
    }

    column.width = newWidth
  }

  // when user releases the mouse, remove the existing event listeners
  // and trigger on resized callback
  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)

    onColumnResized(column, w)
  }

  // attach listeners for document's events
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

async function onColumnResized(column: GridColumn, previousWidth: number): Promise<void> {
  columnLoading.value = column.key

  await handle(async () => {
    await api.gridSetting.setColumnWidth(props.identifier, {
      key: column.key,
      width: column.width!,
    })

    await toaster.success({
      title: 'toast.grid.updateColumnWidth'
    })
  }, (e: any) => {
    // set column width to the previous one
    // because saving od the width failed
    column.width = previousWidth

    return false
  })

  columnLoading.value = null
}

async function onSettingsUpdated(settings: Grid): Promise<void> {
  const perPageChanged = settings.perPage !== grid.value!.perPage

  // update grid settings with new definition
  grid.value = settings

  // close the modal
  settingsModalOpened.value = false

  // refresh the data in the grid
  // in case the user updated the
  // perPage
  if (perPageChanged) {
    // if page is 1, we need to
    // refresh the data in the
    // grid
    if (query.value.page === 1) {
      await loadData()
    }

    // reset the page to 1 in this
    // case:
    // - user has 50 perPage set
    // - user is on the 6th page
    // - user changes it to 300
    // - there is no 6th page and
    // user sees blank page
    else {
      await updateQuery({'page': '1'}, [])
    }
  }
}

async function onChangePage(value: number): Promise<void> {
  await updateQuery({'page': _.toString(value)}, [])
}

async function onSearch(value: string | null): Promise<void> {
  // set pagination to 1, because user could have
  // entered a search query which won't find any
  // results or fewer results than he already had,
  // and he would see a blank page
  if (value) {
    await updateQuery({'searchQuery': value, 'page': '1'}, [])
  } else {
    await updateQuery({'page': '1'}, ['searchQuery'])
  }
}

const debouncedOnSearch = _.debounce(onSearch, 500)

function onFilter(): void {
  // todo
}

function onFilterClear(): void {
  // todo
}

async function onSort(column: GridColumn): Promise<void> {
  if (! column.allowSort) {
    return
  }

  const currentOrder = _.get(query.value.sort, column.key) || null as ORDER | null

  let nextOrder: ORDER | null = null

  if (currentOrder === null) {
    nextOrder = ORDER.ASC
  } else if (currentOrder === ORDER.ASC) {
    nextOrder = ORDER.DESC
  }

  if (nextOrder === null) {
    await updateQuery({}, [
      `sort[${column.key}]`
    ])
  } else {
    await updateQuery({
      [`sort[${column.key}]`]: _.toString(nextOrder)
    }, [])
  }
}

async function onUpdateQuery(value: LocationQuery): Promise<void> {
  // user was probably on page like this
  // /users?page=1
  //
  // and clicked on the menu item "Users" again
  // to be redirected to /users
  //
  // => we apply the previous query and replace
  //
  // => we then return, because the handler will
  // get triggered again
  if (_.isEmpty(value)) {
    await updateQuery(collectQuery(false), [], true)

    return
  }

  const newQuery = parseQuery(value)

  // there were no query changes
  // relevant to the grid
  if (! hasQueryChanged(newQuery, query.value)) {
    return
  }

  query.value = newQuery

  await loadData()
}

function hasQueryChanged(a: GridQuery, b: GridQuery): boolean {
  if (a.page !== b.page) {
    return true
  }

  if (a.searchQuery !== b.searchQuery) {
    return true
  }

  for (const key in a.sort) {
    if (!(key in b.sort) || b.sort[key] !== a.sort[key]) {
      return true
    }
  }

  for (const key in b.sort) {
    if (!(key in a.sort) || b.sort[key] !== a.sort[key]) {
      return true
    }
  }

  return false
}

/**
 * Updates query and changes the URL.
 */
async function updateQuery(setKeys: StringMap<string>, unsetKeys: string[], replace: boolean = false): Promise<void> {
  for (const key in setKeys) {
    route.query[key] = setKeys[key]
  }

  for (const key of unsetKeys) {
    delete route.query[key]
  }

  await navigateTo({
    path: route.path,
    query: route.query,
    force: true,
    replace,
  })
}

/**
 * Collects the query string from local query object
 * for the API call for the data.
 */
function collectQuery(addPerPage: boolean = true): GridQueryString {
  if (! grid.value) {
    throw new Error('Cannot collect query when grid is not loaded.')
  }

  const object: GridQueryString = {}

  if (query.value.page !== null && query.value.page >= 1) {
    object['page'] = _.toString(query.value.page)
  } else {
    object['page'] = '1'
  }

  if (grid.value.allowSearch && query.value.searchQuery !== null) {
    object['searchQuery'] = _.toString(query.value.searchQuery)
  }

  if (! _.isEmpty(query.value.sort)) {
    for (const column in query.value.sort) {
      object[`sort[${column}]`] = _.toString(query.value.sort[column])
    }
  }

  if (addPerPage) {
    object['perPage'] = _.toString(grid.value.perPage)
  }

  return object
}

/**
 * Checks if query param is relevant to the grid.
 */
function isQueryKeyRelevant(key: string): boolean {
  // page param
  if (key === 'page') {
    return true
  }

  // search query param
  if (key === 'searchQuery') {
    return true
  }

  // sort array param
  if (/sort\[[a-zA-Z]+]/.test(key)) {
    return true
  }

  return false
}

/**
 * Parses URL query string to the local query object.
 */
function parseQuery(value: LocationQuery): GridQuery {
  const query: GridQuery = {
    page: 1,
    searchQuery: null,
    sort: {}
  }

  const page = value['page'] ? _.toNumber(value['page']) : null

  if (page !== null && !isNaN(page) && page >= 1) {
    query.page = page
  }

  const searchQuery = value['searchQuery'] ? _.toString(value['searchQuery']) : null

  if (searchQuery !== null) {
    query.searchQuery = searchQuery
  }

  for (const key in value) {
    if (! /sort\[[a-zA-Z]+]/.test(key)) {
      continue
    }

    const column = key.replace('sort[', '').replace(']', '')

    query.sort[column] = value[key]! as ORDER
  }

  return query
}

async function loadData(): Promise<void> {
  dataLoading.value = true

  await handle(async () => {
    const response = await props.callee(collectQuery())

    data.value = response.data
    pagination.value = response.meta

    // clear previously selected rows,
    // so they won't get stuck
    onActionCanceled()
  })

  dataLoading.value = false
}

async function loadGrid(): Promise<void> {
  gridLoading.value = true

  await handle(async () => {
    const response = await api.grid.show(props.identifier)
    grid.value = response._data!.data.grid
    query.value = response._data!.data.query
  })

  gridLoading.value = false
}

async function init(): Promise<void> {
  await loadGrid()

  // grid failed to load
  // => error is shown to the user
  if (! grid.value) {
    return
  }

  // check if user loaded the page with
  // some query params
  //
  // if so, we suppose he copied the link
  // from somewhere else, and we apply the
  // query from the URL
  const hasAnyRelevantQueryParams = Object.keys(route.query).some(isQueryKeyRelevant)

  if (hasAnyRelevantQueryParams) {
    query.value = parseQuery(route.query)
  }

  await loadData()

  // build the query string
  // from local query object
  const queryString = collectQuery(false)

  const isOnNonExistingPage =
      data.value.length === 0 &&
      pagination.value !== null &&
      pagination.value.currentPage > pagination.value.lastPage

  // user somehow change the page
  // to non-existing one, change
  // it back to 1
  //
  // this won't happen that much,
  // it is just a precaution
  if (isOnNonExistingPage) {
    queryString['page'] = '1'
  }

  // update query string with
  // params from the grid
  //
  // use replace, so when user
  // hits back, he won't end up
  // on a screen with no params
  await updateQuery(queryString, [], true)

  // set initialized indicator
  // to true
  initialized.value = true

  // setup query watcher, so every time
  // we update the query string, the data
  // are reloaded automatically
  watch(() => route.query, onUpdateQuery, { immediate: isOnNonExistingPage })
}

onMounted(init)

defineExpose<DataGridTableExpose>({
  refresh: loadData,
})
</script>
