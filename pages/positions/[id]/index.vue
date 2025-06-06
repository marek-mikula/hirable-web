<template>
  <div class="grid lg:grid-cols-3 gap-3 lg:gap-4 items-start">

    <div class="col-span-1 lg:col-span-2 overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <dl class="divide-y divide-gray-200">

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
              {{ $t('model.position.sections.basicInfo') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.name') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.name }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.department') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.department ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.field') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.field ? position.field.label : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.workload') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.workloads.length > 0">
                <li v-for="workload in position.workloads" :key="workload.value">
                  {{ workload.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentRelationship') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.employmentRelationships.length > 0">
                <li v-for="relationship in position.employmentRelationships" :key="relationship.value">
                  {{ relationship.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentForm') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.employmentForms.length > 0">
                <li v-for="form in position.employmentForms" :key="form.value">
                  {{ form.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.address') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.address }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.jobSeatsNum') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.jobSeatsNum }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.isTechnical') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.isTechnical ? $t('common.boolean.yes') : $t('common.boolean.no') }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.description') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.description }}
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
              {{ $t('model.position.sections.roles.title') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hiringManagers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.hiringManagers.length > 0 ? _.map(position.hiringManagers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.approvers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.approvers.length > 0 ? _.map(position.approvers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.externalApprovers') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.externalApprovers.length > 0 ? _.map(position.externalApprovers, 'fullName').join(', ') : '-' }}
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
            {{ $t('model.position.sections.offer') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salary') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrom && position.salaryTo ? `${position.salaryFrom} - ${position.salaryTo}` : position.salaryFrom }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryType') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryType.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryFrequency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrequency.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryCurrency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryCurrency.label }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryVar') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryVar ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.benefits') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.benefits.length > 0">
                <li v-for="benefit in position.benefits" :key="benefit.value">
                  {{ benefit.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
            {{ $t('model.position.sections.hardSkills') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.minEducationLevel') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.minEducationLevel?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.seniority') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.seniority?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.experience') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.experience ?? '-' }}
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.drivingLicence') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.drivingLicences.length > 0">
                <li v-for="drivingLicence in position.drivingLicences" :key="drivingLicence.value">
                  {{ drivingLicence.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
            {{ $t('model.position.sections.softSkills.title') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.organisationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.organisationSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.teamSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.teamSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.timeManagement') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.timeManagement }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.communicationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.communicationSkills }} / 10
            </dd>
          </div>
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.leadership') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.leadership }} / 10
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
            {{ $t('model.position.sections.languageSkills.title') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul class="pl-3 list-disc" v-if="position.languageRequirements.length > 0">
                <li v-for="requirement in position.languageRequirements" :key="requirement.language.value">
                  {{ requirement.language.label }} ({{ requirement.level.label }})
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
        </template>

        <div>
          <button type="button" class="p-3 hover:bg-gray-50 w-full hover:text-primary-600 text-gray-900 text-left flex items-center gap-x-2">
            <span class="text-sm font-semibold flex-1 min-w-0">
            {{ $t('model.position.sections.other') }}
            </span>
            <ChevronUpIcon class="size-4 shrink-0"/>
          </button>
        </div>

        <template v-if="true">
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.note') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.note ?? '-' }}
            </dd>
          </div>
          <div class="p-3">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.files') }}
            </dt>
            <dd class="mt-2 sm:col-span-2 space-y-1">
              <CommonFile v-for="file in position.files" :key="file.id" :file="file"/>
            </dd>
          </div>
        </template>
      </dl>
    </div>

    <div class="col-span-1 space-y-2">

      <div class="text-sm font-semibold">
        🗒️ Komentáře
      </div>

      <div class="space-y-2">
        <FormTextarea name="comment"/>
        <div class="text-right">
          <CommonButton type="button" :label="$t('common.action.save')"/>
        </div>
      </div>

      <div class="space-y-2">

        <div v-for="n in 3" class="bg-gray-50 p-2 rounded-md border border-gray-200 space-y-1 shadow-sm">

          <div class="text-xs flex items-center justify-start space-x-2">
            <span class="min-w-0 truncate font-semibold">Marek Mikula</span>
            <span class="shrink-0 text-gray-500">Před 3 dny</span>
          </div>

          <div class="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur bibendum justo non orci. Praesent vitae arcu tempor neque lacinia pretium. Etiam egestas wisi a erat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In rutrum. Proin in tellus sit amet nibh dignissim sagittis. Nam sed tellus id magna elementum tincidunt. In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Morbi scelerisque luctus velit. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu, velit.
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import {ChevronUpIcon} from "@heroicons/vue/24/outline";
import type {Position} from "~/repositories/resources";

const props = defineProps<{
  position: Position
}>()
</script>
