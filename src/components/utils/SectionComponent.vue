<template>
  <main>
    <div class="px-10 mb-10">
      <slot></slot>
    </div>
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
