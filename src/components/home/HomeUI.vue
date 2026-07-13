<template>
  <div
    class="flex flex-col items-center justify-center absolute font-terminal transition-all duration-1000 ease-in-out text-white left-1/2 -translate-x-1/2"
    :class="{
      'top-1/2': props.state === 'loading',
      'top-5': props.state === 'loaded',
    }"
  >
    <h1
      class="font-bold mb-4 transition-all duration-1000 ease-in-out"
      :class="{
        'text-4xl': props.state === 'loading',
        'text-2xl': props.state === 'loaded',
      }"
    >
      DT.DEV
    </h1>
    <progress
      class="custom-progress w-56"
      :value="props.progress"
      v-if="props.state === 'loading'"
    ></progress>
    <p class="mt-2 text-sm" v-if="props.state === 'loading'">
      Loading {{ dots }} {{ Math.round(props.progress * 100) }}%
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

type HomeUIStates = "loading" | "loaded";

const dots = ref("");

const props = withDefaults(
  defineProps<{
    progress: number;
    state: HomeUIStates;
  }>(),
  {
    state: "loading",
  },
);

onMounted(() => {
  setInterval(() => {
    dots.value = dots.value.length < 3 ? dots.value + "." : "";
  }, 500);
});
</script>

<style scoped>
.custom-progress::-webkit-progress-bar {
  background-color: transparent;
  border: 2px solid white;
}

.custom-progress::-webkit-progress-value {
  background-color: white;
}

.custom-progress::-moz-progress-bar {
  background-color: transparent;
}
</style>
