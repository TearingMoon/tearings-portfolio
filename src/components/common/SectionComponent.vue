<template>
  <main class="p-5 lg:p-10 w-full h-screen flex flex-col items-center justify-center">
    <div
      class="w-full border-2 border-green-500 transition-all duration-500 h-full overflow-auto customScrollbar"
      ref="sectionContainer"
      :class="[isContainerVisible ? 'max-h-full' : 'max-h-0']"
    >
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useTemplateRef, onMounted, ref } from 'vue'

const isContainerVisible = ref(false)
const sectionContainer = useTemplateRef('sectionContainer')

onMounted(() => {
  if (sectionContainer.value) {
    setTimeout(() => {
      isContainerVisible.value = true
    }, 1000)
  }
})
</script>

<style scoped>

.customScrollbar::-webkit-scrollbar {
  background-color: transparent;
}

.customScrollbar::-webkit-scrollbar-thumb {
  background-color: green;
}

.customScrollbar::-webkit-scrollbar-track {
  background: transparent;
}

</style>
