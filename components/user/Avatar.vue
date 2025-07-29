<template>
  <div>
    <!-- user profile pic -->
    <img
        v-if="false"
        :class="[sizeClass || '', 'inline-block rounded-full']"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="User profile avatar"
    >

    <!-- user initials -->
    <span
        v-else
        :class="[sizeClass || '', 'inline-flex items-center justify-center rounded-full bg-primary-500']"
    >
      <span :class="[textClass || '', 'font-medium leading-none text-white']">
        {{ initials(user.fullName) }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  sizeClass?: string
  textClass?: string
}>()

const {user} = useAuth<true>()
</script>