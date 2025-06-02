<template>
  <div class="border border-gray-300 rounded-md overflow-hidden">
    <div class="overflow-scroll">
      <table class="min-w-full border-spacing-0 border-separate">
        <thead class="bg-gray-50 sticky top-0">
        <tr>
          <th v-for="column in columns" :key="column.key" scope="col" class="py-2 px-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap border-b border-gray-300">
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody class="bg-white">
        <tr v-for="(item, index) in items" :key="_.get(item, keyAttribute)">
          <td v-for="column in columns" :key="column.key" :class="['py-2 px-4 text-sm font-medium whitespace-nowrap text-gray-900 border-gray-300', {
            'border-b': index < (items.length - 1),
          }]">
            <slot :name="`${column.key}Slot`" v-bind="{column, item}">
              <span>{{ _.get(item, column.key) || '-'}}</span>
            </slot>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'

defineProps<{
  columns: {
    key: string
    label: string
  }[]
  items: unknown[]
  keyAttribute: string
}>()
</script>
