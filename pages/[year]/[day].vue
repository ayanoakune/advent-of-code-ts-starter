<script lang="ts" setup>
const route = useRoute();

function getYearFromRoute(): string {
  const year = route.params.year;

  if (typeof year !== "string") {
    throw new Error(
      `Router param "year" must be a string. Got "${typeof year}" (value: "${year}").`
    );
  }

  if (Number(year) > new Date().getFullYear()) {
    // @todo
  }

  return year;
}

function getDayFromRoute(): string {
  const day = route.params.day;

  if (typeof day !== "string") {
    throw new Error(
      `Router param "day" must be a string. Got "${typeof day}" (value: "${day}").`
    );
  }

  if (Number(day) > 25) {
    // @todo
  }

  return day;
}

/**
 * Get the whole file code (as raw) as one single string value.
 */
async function getFileRawContent(
  year: number | string,
  day: number | string
): Promise<string> {
  const code = await import(`~/advent-of-code/${year}/day-${day}.ts?raw`);

  return code.default;
}

async function getSolutions(
  year: number | string,
  day: number | string
): Promise<[Function, Function]> {
  const solutions: {
    solutionFirstHalf: Function;
    solutionSecondHalf: Function;
  } = await import(`~/advent-of-code/${year}/day-${day}.ts`);

  if (!solutions.solutionFirstHalf) {
    throw new Error(
      `Unable to find function "solutionFirstHalf()" in "~/advent-of-code/${year}/day-${day}.ts" file.`
    );
  }

  if (typeof solutions.solutionFirstHalf !== "function") {
    throw new Error('"solutionFirstHalf" must be a function.');
  }

  if (!solutions.solutionSecondHalf) {
    throw new Error(
      `Unable to find function "solutionSecondHalf()" in "~/advent-of-code/${year}/day-${day}.ts" file.`
    );
  }

  if (typeof solutions.solutionSecondHalf !== "function") {
    throw new Error('"solutionSecondHalf" must be a function.');
  }

  return [solutions.solutionFirstHalf, solutions.solutionSecondHalf];
}

const code = ref("");
const answerOfFirstHalf = ref("");
const answerOfSecondHalf = ref("");

onMounted(async () => {
  try {
    const year = getYearFromRoute();
    const day = getDayFromRoute();

    code.value = await getFileRawContent(year, day);

    const [solutionFirstHalf, solutionSecondHalf] = await getSolutions(
      year,
      day
    );

    answerOfFirstHalf.value = solutionFirstHalf();
    answerOfSecondHalf.value = solutionSecondHalf();
  } catch (err) {
    throw new Error("something wrong");
  }
});
</script>
<template>
  <code>{{ code }}</code>
  <div>{{ answerOfFirstHalf }}</div>
  <div>{{ answerOfSecondHalf }}</div>
</template>
