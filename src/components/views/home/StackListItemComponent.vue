<template>
  <div class="p-10 border-2 border-white flex-auto md:w-1/3">
    <slot name="content"></slot>
    <h2 class="font-bold text-2xl my-5"><slot name="title"></slot></h2>
    <p class="wordSpacingSm">
      <slot name="description"></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
