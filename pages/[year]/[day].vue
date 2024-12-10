<script lang="ts" setup>
const tshl = useTypescriptHighlight();
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

async function getInputForSolution(
  year: number | string,
  day: number | string
): Promise<string> {
  const input = await import(
    `~/advent-of-code/${year}/day-${day}-input.txt?raw`
  );

  return input.default;
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

/**
 * Get the whole file code (as raw) as one single string value.
 */
const code = ref("");

/**
 * Input for the solution.
 */
const input = ref("");

/**
 * Function of the first half of the solution.
 */
const fnOfFirstHalf = ref<Function>(() => "");

/**
 * Function of the second half of the solution.
 */
const fnOfSecondHalf = ref<Function>(() => "");

/**
 * Output of the first half of the solution.
 */
const outputOfFirstHalf = ref("");

/**
 * Output of the second half of the solution.
 */
const outputOfSecondHalf = ref("");

useHead({
  title: `Advent of Code ${route.params.year} - Day ${route.params.day}`,
});

onMounted(async () => {
  try {
    const year = getYearFromRoute();
    const day = getDayFromRoute();

    code.value = await getFileRawContent(year, day);
    input.value = await getInputForSolution(year, day);

    const [solutionFirstHalf, solutionSecondHalf] = await getSolutions(
      year,
      day
    );

    fnOfFirstHalf.value = solutionFirstHalf;
    fnOfSecondHalf.value = solutionSecondHalf;
  } catch (err) {
    throw new Error("something wrong");
  }
});

function runFnOfFirstHalf() {
  outputOfFirstHalf.value = fnOfFirstHalf.value();
}

function runFnOfSecondHalf() {
  outputOfSecondHalf.value = fnOfSecondHalf.value();
}
</script>
<template>
  <div class="py-10">
    <header>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Advent of Code {{ route.params.year }} - Day {{ route.params.day }}
        </h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="block">
          <div class="mx-auto max-w-7xl">
            <pre class="whitespace-pre-line">
              <code v-html="tshl(code)" />
            </pre>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
