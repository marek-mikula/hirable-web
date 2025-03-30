<template>
  <NuxtLoadingIndicator class="bg-primary-500" :color="''" :throttle="100" :height="3" :duration="3000"/>
  <NuxtLayout>
    <NuxtPage/>
    <CommonModalConfirm/>
  </NuxtLayout>
</template>