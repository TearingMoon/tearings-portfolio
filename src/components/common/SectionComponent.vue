<template>
  <main class="px-10 mb-20">
    <slot></slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionComponent',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
