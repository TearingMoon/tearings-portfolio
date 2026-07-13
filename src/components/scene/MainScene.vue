<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TresCanvas } from "@tresjs/core";

import Starfield from "@/components/scene/Starfield.vue";

const starfieldProgress = defineModel<number>("starfieldProgress", {
  required: true,
});

const emit = defineEmits<{
  "starfield-revealed": [];
}>();

const starfieldActive = ref(false);

onMounted(() => {
  starfieldActive.value = true;
});

function handleStarfieldRevealed(): void {
  emit("starfield-revealed");
}
</script>

<template>
  <TresCanvas window-size alpha :clear-alpha="0">
    <Starfield
      v-model:progress="starfieldProgress"
      :active="starfieldActive"
      :count="25000"
      :speed="0.1"
      :reveal-duration="5"
      @revealed="handleStarfieldRevealed"
    />
  </TresCanvas>
</template>
