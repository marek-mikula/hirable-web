<template>
  <div class="space-y-3 lg:space-y-4">

    <!-- todo: filtering, searching in kanban -->
    <div v-if="false" class="flex items-center">
      <FormInput
          type="search"
          name="name"
          class="w-42"
          :icon="MagnifyingGlassIcon"
          :placeholder="$t('common.table.search')"
      />
    </div>

    <div class="overflow-x-auto flex flex-row flex-nowrap gap-3 lg:gap-4 scrollbar-hidden">
      <div v-for="n in 10" :key="n" class="shrink-0 w-[350px] flex flex-col space-y-2">

        <!-- kanban column header -->
        <div class="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200">
          <h2 class="flex-1 min-w-0 text-lg font-medium truncate">
            Pohovor {{n}}
          </h2>
          <div class="shrink-0 flex items-center space-x-2">
            <CommonBadge variant="info" label="Celkem: 0"/>
            <CommonButton variant="secondary" :size="2" symmetrical>
              <EllipsisVerticalIcon class="size-4"/>
            </CommonButton>
          </div>
        </div>

        <!-- kanban column body -->
        <div class="flex-col space-y-1">

          <p v-if="Math.random() >= 0.5" class="border border-dashed border-gray-200 p-3 lg:p-4 text-sm rounded-md text-gray-500">
            Žádní kandidáti
          </p>

          <template v-else>
            <div v-for="k in 3" :key="k" class="border border-gray-200 bg-white rounded-md flex flex-col p-2 space-y-2">
              <div class="flex items-center space-x-2">
                <FormCheckbox class="shrink-0"/>
                <span class="text-sm font-medium flex-1 min-w-0">
                Marek Mikula
              </span>
                <CommonButton variant="secondary" :size="2" symmetrical>
                  <EllipsisVerticalIcon class="size-4"/>
                </CommonButton>
              </div>
              <div class="flex items-center">
              <span class="text-sm text-gray-500" v-tooltip="{ content: '13. 4. 2025 13:40:34' }">
                3 měsíce zpět
              </span>
              </div>
            </div>
          </template>

        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {
  MagnifyingGlassIcon,
  EllipsisVerticalIcon
} from "@heroicons/vue/24/outline";
</script>
