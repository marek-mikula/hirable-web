<template>
  <CommonModal width="xl" :title="$t('modal.grid.settings.title')" :title-icon="Cog6ToothIcon" :open="open" @close="emit('close')">
    <template #content>
      <CommonForm id="grid-settings-form" v-slot="{ isLoading, firstError }" :handler="handler" class="divide-y divide-gray-200">

        <div class="divide-y divide-gray-200">

          <div class="p-4 space-y-2">

            <label class="block text-sm font-medium text-gray-900">
              {{ $t('modal.grid.settings.columns') }}
              <span class="font-bold text-red-500">*</span>
            </label>

            <Draggable
                v-model="data.columns"
                tag="ul"
                class="space-y-1"
                handle=".drag-handle"
                item-key="key"
                easing="cubic-bezier(1, 0, 0, 1)"
                direction="vertical"
                :animation="200"
            >
              <template #item="{ element: column }">
                <li class="border border-gray-200 rounded-md bg-gray-50 py-1 px-2 flex items-center space-x-2">
                  <ArrowsPointingOutIcon class="shrink-0 size-5 drag-handle cursor-move"/>
                  <span class="flex-1 text-sm">
                  {{ $t(column.label) }}
                </span>
                  <FormCheckbox
                      v-model="column.enabled"
                      :name="`grid-${grid.identifier}-column-${column.key}`"
                      :disabled="! column.allowToggle"
                      class="shrink-0"
                  />
                </li>
              </template>
            </Draggable>

          </div>

          <div class="p-4 space-y-3">
            <FormCheckbox
                v-model="data.stickyHeader"
                name="stickyHeader"
                :error="firstError('stickyHeader')"
                :label="$t('modal.grid.settings.stickyHeader')"
                :hint="$t('modal.grid.settings.stickyHeaderHint')"
            />

            <FormCheckbox
                v-model="data.stickyFooter"
                name="stickyFooter"
                :error="firstError('stickyFooter')"
                :label="$t('modal.grid.settings.stickyFooter')"
                :hint="$t('modal.grid.settings.stickyFooterHint')"
            />

            <FormSelect
                v-model="data.perPage"
                name="perPage"
                :error="firstError('perPage')"
                :label="$t('modal.grid.settings.perPage')"
                :options="[
                  { value: 50, label: '50'},
                  { value: 100, label: '100'},
                  { value: 150, label: '150'},
                  { value: 200, label: '200'},
                  { value: 250, label: '250'},
                  { value: 300, label: '300'},
              ]"
                disable-empty
                hide-search
                required
            />
          </div>

        </div>

        <div class="p-4 flex items-center justify-between space-x-2">
          <div class="flex items-center space-x-2">
            <CommonButton
                variant="secondary"
                :label="$t('common.action.cancel')"
                @click="emit('close')"
            />
            <CommonButton
                variant="secondary"
                :label="$t('modal.grid.settings.resetDefault')"
                :loading="isResetting"
                :disabled="isResetting"
                @click="resetDefault"
            />
          </div>
          <CommonButton
              type="submit"
              variant="primary"
              :label="$t('common.action.confirm')"
              :loading="isLoading"
              :disabled="isLoading"
          />
        </div>

      </CommonForm>
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import _ from 'lodash'
import {
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import type {FormHandler} from "~/types/components/common/form.types";
import type {Grid} from "~/repositories/resources";
import type {UpdateSettingsData} from "~/repositories/grid/inputs";

const props = defineProps<{
  grid: Grid
  open: boolean
}>()

const api = useApi()
const toaster = useToaster()

const isResetting = ref<boolean>(false)

const data = ref<{
  perPage: number,
  stickyHeader: boolean,
  stickyFooter: boolean,
  columns: {
    key: string
    enabled: boolean
    label: string
    allowToggle: boolean
  }[]
}>({
  perPage: 50,
  stickyHeader: true,
  stickyFooter: true,
  columns: []
})

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'update', grid: Grid): void,
}>()

const handler: FormHandler = {
  async onSubmit(): Promise<void> {
    const mappedData: UpdateSettingsData = {
      perPage: data.value.perPage,
      stickyHeader: data.value.stickyHeader,
      stickyFooter: data.value.stickyFooter,
      columns: data.value.columns.map(item => _.pick(item, ['key', 'enabled'])),
    }

    const response = await api.gridSetting.update(props.grid.identifier, mappedData);

    onGridUpdated(response._data!.data.grid)

    await toaster.success({
      title: 'toast.grid.updateSettings'
    })
  }
}

async function resetDefault(): Promise<void> {
  isResetting.value = true

  await handle(async () => {
    const response = await api.gridSetting.reset(props.grid.identifier)

    onGridUpdated(response._data!.data.grid)

    await toaster.success({
      title: 'toast.grid.resetSettings'
    })
  })

  isResetting.value = false
}

function onGridUpdated(grid: Grid): void {
  copyData(grid)
  emit('update', grid)
}

function copyData(grid: Grid): void {
  data.value.perPage = grid.perPage
  data.value.stickyHeader = grid.stickyHeader
  data.value.stickyFooter = grid.stickyFooter
  data.value.columns = grid.columns.map(item => ({
    key: item.key,
    enabled: item.enabled,
    label: item.label,
    allowToggle: item.allowToggle
  }))
}

function init(): void {
  copyData(props.grid)
}

onMounted(init)
</script>
