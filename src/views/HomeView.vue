<template>
  <main>
    <sectionComponent>
      <div class="w-full h-screen py-10">
        <div class="flex flex-col justify-center items-center h-full w-full text-white">
          <h1 class="font-bold text-8xl mb-10"><typingEffect text="DAVID TORRUBIA " /></h1>
          <h3 class="text-xl wordSpacing">COMPUTER ENGINEERING & SOFTWARE DEVELOPER.</h3>
        </div>
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="svg5130"
          preserveAspectRatio="xMidYMid"
          class="text-white absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <defs id="defs6288"></defs>
          <path
            d=" M 5 15 C 5 16.8565 5.73754 18.6371 7.05029 19.9498 C 8.36305 21.2626 10.1435 21.9999 12 21.9999 C 13.8565 21.9999 15.637 21.2626 16.9498 19.9498 C 18.2625 18.6371 19 16.8565 19 15 V 9 C 19 7.14348 18.2625 5.36305 16.9498 4.05029 C 15.637 2.73754 13.8565 2 12 2 C 10.1435 2 8.36305 2.73754 7.05029 4.05029 C 5.73754 5.36305 5 7.14348 5 9 V 15 Z "
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="path3513"
          ></path>
          <path
            d="M 12 6 L 12 14"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="path8126"
          >
            <animateTransform
              attributeName="transform"
              attributeType="auto"
              type="translate"
              values="0 0;0 5;0 0"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0 0 1 1;0 0 1 1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
              additive="sum"
              accumulate="none"
              fill="freeze"
              id="animateTransform1743"
            ></animateTransform>
          </path>
          <path
            d="M 15 11 L 12 14 L 9 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="path4934"
          >
            <animateTransform
              attributeName="transform"
              attributeType="auto"
              type="translate"
              values="0 0;0 5;0 0"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0 0 1 1;0 0 1 1"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
              additive="sum"
              accumulate="none"
              fill="freeze"
              id="animateTransform7630"
            ></animateTransform>
          </path>
        </svg>
      </div>
    </sectionComponent>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sectionComponent from '@/components/utils/SectionComponent.vue'
import typingEffect from '@/components/utils/TypingEffect.vue'
export default defineComponent({
  setup() {
    return {}
  },
  components: {
    sectionComponent,
    typingEffect
  }
})
</script>

<style scoped>
.wordSpacing {
  word-spacing: 0.5em;
}
</style>
