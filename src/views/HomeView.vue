<template>
  <main>
    <SectionComponent class="w-full h-screen flex flex-col justify-center items-center">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-1/2 h-1/2 z-10"
          v-if="isCircleVisible"
        >
          <circle
            ref="circle"
            cx="50"
            cy="50"
            r="40"
            transform="rotate(-90 50 50)"
            stroke="white"
            stroke-width="3"
            fill="none"
            stroke-dasharray="251.2"
            stroke-dashoffset="251.2"
          >
            <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="2s" fill="freeze" />
          </circle>
        </svg>
      </transition>
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div class="absolute w-full h-screen z-0 text-neutral-500" v-if="isGridVisible">
          <div class="w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </transition>
      <TypingEffect
        ref="nameTyping"
        text="David Torrubia"
        class="text-8xl font-extrabold text-white z-10"
        @doneTyping="showEnd"
        :auto-start="false"
        v-if="isTypingVisible"
      ></TypingEffect>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import TypingEffect from '@/components/utils/TypingEffect.vue'
import SectionComponent from '@/components/utils/SectionComponent.vue'
import { onMounted, ref, useTemplateRef } from 'vue'

const startTyping = useTemplateRef('nameTyping')
const circle = useTemplateRef('circle')

const isCircleVisible = ref(true)
const isTypingVisible = ref(false)
const isGridVisible = ref(false)

function start() {
  isCircleVisible.value = false
  isTypingVisible.value = true
  isGridVisible.value = true

  setTimeout(() => {
    if (startTyping.value) {
      startTyping.value.startTyping()
    }
  }, 1000)
}

function showEnd() {}

onMounted(() => {
  if (circle.value) {
    const animate = circle.value.querySelector('animate')
    if (animate) {
      animate.addEventListener('endEvent', start)
    }
  }
})
</script>

<style scoped></style>
