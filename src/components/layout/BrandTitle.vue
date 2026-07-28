<script setup lang="ts">
import { computed } from "vue";

interface Props {
  compact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
});

const emit = defineEmits<{
  transitionComplete: [];
}>();

const positionClasses = computed(() => {
  if (props.compact) {
    return ["top-4", "-translate-x-1/2", "translate-y-0", "scale-[0.4]"];
  }

  return [
    "top-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2 -translate-y-18",
    "scale-100",
  ];
});

function handleTransitionEnd(): void {
  emit("transitionComplete");
}
</script>

<template>
  <header
    class="pointer-events-none absolute left-1/2 z-30 w-max max-w-[calc(100%-2rem)] text-center transition-all duration-500 ease-in-out motion-reduce:transition-none"
    :class="positionClasses"
    @transitionend="handleTransitionEnd"
  >
    <h1
      class="whitespace-nowrap font-semibold text-white text-5xl font-terminal text-center"
    >
      DT.DEV
    </h1>
  </header>
</template>
