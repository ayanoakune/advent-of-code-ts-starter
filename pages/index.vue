<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
<template>
  <div class="h-screen grid justify-center items-center">
    <div class="grid gap-4">
      <h1 class="text-4xl">Advent of Code</h1>
      <div class="grid justify-center">
        <NuxtLink :to="`/${currentYear}/calendar`">
          <UButton>My solutions</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
