<template>
  <SectionComponent class="w-full h-screen flex flex-col justify-center items-center">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="firstPhase"
        class="absolute w-full h-full flex flex-col justify-center items-center"
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute w-1/2 h-1/2 z-10"
        >
          <circle
            ref="LoadingCircle"
            cx="50"
            cy="50"
            r="40"
            transform="rotate(-90 50 50)"
            stroke="white"
            stroke-width="6"
            fill="none"
            stroke-dasharray="251.2"
            stroke-dashoffset="251.2"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="251.2"
              to="0"
              dur="2s"
              fill="freeze"
              ref="loadingCircleAnimation"
            />
          </circle>
        </svg>
        <h1 class="sm:text-4xl font-extrabold text-white absolute">Loading</h1>
      </div>
    </transition>

    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="absolute w-full h-screen z-0 text-neutral-500" v-if="secondPhase">
        <div class="w-full h-full">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" patternUnits="userSpaceOnUse" width="80" height="80">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" stroke-width="1" />
              </pattern>
              <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" style="stop-color: var(--color-neutral-900); stop-opacity: 0" />
                <stop offset="100%" style="stop-color: var(--color-neutral-900); stop-opacity: 1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#fade)" />
          </svg>
        </div>
      </div>
    </transition>
    <TypingEffect
      ref="nameTypingEffect"
      text="David Torrubia"
      class="text-6xl sm:text-8xl font-extrabold text-white z-10 my-4 text-center"
      @doneTyping="finishTyping"
      :auto-start="false"
      v-if="secondPhase"
    ></TypingEffect>
    <Transition
      enter-active-class="animate__animated animate__flipInX"
      leave-active-class="animate__animated animate__flipOutX"
    >
      <h1 class="text-white sm:text-2xl z-10 w-full text-center" v-if="thirdPhase">
        Software Engineer | Full Stack Developer
      </h1>
    </Transition>
  </SectionComponent>
</template>

<script setup lang="ts">
import TypingEffect from '@/components/utils/TypingEffect.vue'
import SectionComponent from '@/components/utils/SectionComponent.vue'
import { onMounted, ref, useTemplateRef } from 'vue'

const nameTypingEffect = useTemplateRef('nameTypingEffect')
const LoadingCircle = useTemplateRef('LoadingCircle')
const animate = useTemplateRef('loadingCircleAnimation')

const firstPhase = ref(true)
const secondPhase = ref(false)
const thirdPhase = ref(false)

const emit = defineEmits(['animationEnd'])

function startTyping() {
  if (animate.value) {
    animate.value?.removeEventListener('endEvent', startTyping)
  }

  firstPhase.value = false
  secondPhase.value = true

  setTimeout(() => {
    if (nameTypingEffect.value) {
      nameTypingEffect.value.startTyping()
    }
  }, 1000)
}

function finishTyping() {
  thirdPhase.value = true
  emit('animationEnd')
}

onMounted(() => {
  if (LoadingCircle.value) {
    if (animate.value) {
      animate.value.addEventListener('endEvent', startTyping)
    }
  }
})
</script>

<style scoped></style>
