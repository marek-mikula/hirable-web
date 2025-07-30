<template>
  <div class="overflow-hidden bg-white shadow-xs rounded-md border border-gray-200 divide-y divide-gray-200">
    <div v-if="!excludeHeader" class="p-3 flex items-center">
      <h1 class="flex-1 min-w-0 truncate text-xl font-semibold text-gray-900">
        {{ $t('page.position.approve.title') }}
      </h1>
      <CommonLogo/>
    </div>
    <div v-if="position.approveMessage" class="p-3">
      <CommonAlert :title="position.approveMessage" variant="info" static/>
    </div>
    <div>
      <dl class="divide-y divide-gray-200">

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.basicInfo') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.name') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.name }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.department') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.department ?? '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.field') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.field ? position.field.label : '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.workload') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.workloads.length > 0" class="pl-3 list-disc">
              <li v-for="workload in position.workloads" :key="workload.value">
                {{ workload.label }}
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.employmentRelationship') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.employmentRelationships.length > 0" class="pl-3 list-disc">
              <li v-for="relationship in position.employmentRelationships" :key="relationship.value">
                {{ relationship.label }}
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.employmentForm') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.employmentForms.length > 0" class="pl-3 list-disc">
              <li v-for="form in position.employmentForms" :key="form.value">
                {{ form.label }}
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.address') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.address ?? '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.jobSeatsNum') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.jobSeatsNum }}
          </dd>
        </div>
        <div class="p-3">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.description') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
            {{ position.description }}
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.offer') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.salary') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.salary.from && position.salary.to ? `${position.salary.from} - ${position.salary.to}` : position.salary.from }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.salaryType') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.salary.type.label }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.salaryFrequency') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.salary.frequency.label }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.salaryCurrency') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.salary.currency.label }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.salaryVar') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.salary.var ?? '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.benefits') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.benefits.length > 0" class="pl-3 list-disc">
              <li v-for="benefit in position.benefits" :key="benefit.value">
                {{ benefit.label }}
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.hardSkills') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.minEducationLevel') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.minEducationLevel?.label ?? '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.educationField') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.educationField ?? '-' }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.seniority') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.seniority.length > 0" class="pl-3 list-disc">
              <li v-for="seniority in position.seniority" :key="seniority.value">
                {{ seniority.label }}
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.experience') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.experience ?? '-' }}
          </dd>
        </div>
        <div class="p-3">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.hardSkills') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
            {{ position.hardSkills ?? '-' }}
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.softSkills.title') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.organisationSkills') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.organisationSkills" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.teamSkills') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.teamSkills" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.timeManagement') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.timeManagement" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.communicationSkills') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.communicationSkills" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.leadership') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.leadership" :max="100"/>
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.languageSkills.title') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.languageSkills') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <ul v-if="position.languageRequirements.length > 0" class="pl-3 list-disc">
              <li v-for="requirement in position.languageRequirements" :key="requirement.language.value">
                {{ requirement.language.label }} ({{ requirement.level.label }})
              </li>
            </ul>
            <span v-else>-</span>
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.recruitment.title') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.hardSkillsWeight') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.hardSkillsWeight" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.softSkillsWeight') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.softSkillsWeight" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.languageSkillsWeight') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.languageSkillsWeight" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.experienceWeight') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.experienceWeight" :max="100"/>
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.educationWeight') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            <CommonScale :value="position.educationWeight" :max="100"/>
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.share.title') }}
          </h2>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.externName') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.externName }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.shareSalary') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.shareSalary ? $t('common.boolean.yes') : $t('common.boolean.no') }}
          </dd>
        </div>
        <div class="p-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.shareContact') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
            {{ position.shareContact ? $t('common.boolean.yes') : $t('common.boolean.no') }}
          </dd>
        </div>

        <div class="p-3">
          <h2 class="text-base font-semibold text-gray-900">
            {{ $t('model.position.sections.other') }}
          </h2>
        </div>
        <div class="p-3">
          <dt class="text-sm font-medium text-gray-900">
            {{ $t('model.position.note') }}
          </dt>
          <dd class="mt-2 text-sm text-gray-700 sm:col-span-2">
            {{ position.note ?? '-' }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {Position} from "~/repositories/resources";

withDefaults(defineProps<{
  position: Position
  excludeHeader: boolean
}>(), {
  excludeHeader: false
})
</script>