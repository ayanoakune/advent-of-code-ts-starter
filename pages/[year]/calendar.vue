<script lang="ts" setup>
definePageMeta({
  layout: "centered",
});

const route = useRoute();
const year = route.params.year;

function getFirstDayOfDecemberWeekday(year: number) {
  // Create a date object for December 1st of the given year
  const date = new Date(year, 11, 1); // 11 is December (0-indexed months)

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const weekday = date.getDay();

  return weekday;
}

const weekday = getFirstDayOfDecemberWeekday(Number(year));
const blankSpaces = 6 - weekday;
const days = 25;
</script>
<template>
  <div class="block">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl grid row-auto gap-16">
        <div class="grid justify-center">
          <h1 class="text-6xl">{{ year }}</h1>
        </div>
        <div class="grid grid-cols-7 justify-center gap-4 sm:gap-6 lg:gap-8">
          <div
            v-for="blank in blankSpaces"
            class="bg-blue-400 border-red-100 border-solid border-2 aspect-square invisible"
          ></div>
          <NuxtLink v-for="day in days" :to="`/${year}/${day}`">
            <div
              class="border-2 aspect-square border-neutral-800 grid justify-center items-center rounded-xl lg:rounded-2xl cursor-pointer"
            >
              <div class="grid grid-cols-1">
                <div></div>
                <div>{{ day }}</div>
                <div></div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
