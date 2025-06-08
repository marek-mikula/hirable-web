<template>
  <div class="mx-auto max-w-2xl p-3 lg:p-4 space-y-3 lg:space-y-4">

    <div class="overflow-hidden bg-white shadow-sm rounded-md border border-gray-200">
      <div class="p-4 flex items-center">
        <h1 class="flex-1 min-w-0 truncate text-xl font-semibold text-gray-900">
          {{ $t('page.approve.title') }}
        </h1>
        <CommonLogo/>
      </div>
      <div class="border-t border-gray-200">
        <dl class="divide-y divide-gray-200">

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.basicInfo') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.name') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.name }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.department') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.department ?? '-' }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.field') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.field ? position.field.label : '-' }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.workload') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul v-if="position.workloads.length > 0" class="pl-3 list-disc">
                <li v-for="workload in position.workloads" :key="workload.value">
                  {{ workload.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentRelationship') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul v-if="position.employmentRelationships.length > 0" class="pl-3 list-disc">
                <li v-for="relationship in position.employmentRelationships" :key="relationship.value">
                  {{ relationship.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.employmentForm') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul v-if="position.employmentForms.length > 0" class="pl-3 list-disc">
                <li v-for="form in position.employmentForms" :key="form.value">
                  {{ form.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.address') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.address }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.jobSeatsNum') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.jobSeatsNum }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.isTechnical') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.isTechnical ? $t('common.boolean.yes') : $t('common.boolean.no') }}
            </dd>
          </div>
          <div class="p-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.description') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.description }}
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.offer') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salary') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrom && position.salaryTo ? `${position.salaryFrom} - ${position.salaryTo}` : position.salaryFrom }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryType') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryType.label }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryFrequency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryFrequency.label }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryCurrency') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryCurrency.label }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.salaryVar') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.salaryVar ?? '-' }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.benefits') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul v-if="position.benefits.length > 0" class="pl-3 list-disc">
                <li v-for="benefit in position.benefits" :key="benefit.value">
                  {{ benefit.label }}
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.hardSkills') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.minEducationLevel') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.minEducationLevel?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.seniority') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.seniority?.label ?? '-' }}
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.experience') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.experience ?? '-' }}
            </dd>
          </div>
          <div class="p-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hardSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.hardSkills ?? '-' }}
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.softSkills.title') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.organisationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.organisationSkills }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.teamSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.teamSkills }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.timeManagement') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.timeManagement }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.communicationSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.communicationSkills }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.leadership') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.leadership }} / 10
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.languageSkills.title') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkills') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul v-if="position.languageRequirements.length > 0" class="pl-3 list-disc">
                <li v-for="requirement in position.languageRequirements" :key="requirement.language.value">
                  {{ requirement.language.label }} ({{ requirement.level.label }})
                </li>
              </ul>
              <span v-else>-</span>
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.recruitment.title') }}
            </h2>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.hardSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.hardSkillsWeight }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.softSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.softSkillsWeight }} / 10
            </dd>
          </div>
          <div class="p-4 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.languageSkillsWeight') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ position.languageSkillsWeight }} / 10
            </dd>
          </div>

          <div class="p-4">
            <h2 class="text-base font-semibold text-gray-900">
              {{ $t('model.position.sections.other') }}
            </h2>
          </div>
          <div class="p-4">
            <dt class="text-sm font-medium text-gray-900">
              {{ $t('model.position.note') }}
            </dt>
            <dd class="mt-2 text-sm/6 text-gray-700 sm:col-span-2">
              {{ position.note ?? '-' }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="flex items-center space-x-2">

      <CommonButton
        variant="danger"
        class="w-full"
        :label="$t('common.action.reject')"
        @click="rejectModalToken = token"
      />

      <CommonButton
          variant="success"
          class="w-full"
          :label="$t('common.action.approve')"
          @click="approveModalToken = token"
      />

    </div>

    <div class="flex items-center justify-center">
      <CommonLocaleSwitch/>
    </div>

    <PositionApprovalApproveModal :approval="approveModalToken" @close="approveModalToken = null" @approve="onDecided"/>
    <PositionApprovalRejectModal :approval="rejectModalToken" @close="rejectModalToken = null" @reject="onDecided"/>

  </div>
</template>

<script setup lang="ts">
import type {Position} from "~/repositories/resources";

const { t } = useI18n()
const { appName } = useAppConfig()
const token = useRouteQuery<string>('token')
const api = useApi()

const {
  data: position,
  error
} = await useAsyncData<Position>('position', () => api.positionExternalApproval.show(token.value).then(response => response._data!.data.position))

if (error.value) {
  throw createError({...error.value, fatal: true})
}

definePageMeta({
  layout: 'default',
  middleware: 'guest',
  async validate(route) {
    return typeof route.query.token === 'string'
  }
})

useHead({
  title: () => t('page.approve.title'),
  titleTemplate: '%position %separator %s %separator %siteName',
  templateParams: {
    separator: '·',
    position: position.value!.name,
    siteName: appName as string
  },
  bodyAttrs: {
    class: 'bg-gray-50'
  }
})

const approveModalToken = ref<string|null>(null)
const rejectModalToken = ref<string|null>(null)

async function onDecided(): Promise<void> {
  approveModalToken.value = null
  rejectModalToken.value = null

  await navigateTo('/login')
}
</script>