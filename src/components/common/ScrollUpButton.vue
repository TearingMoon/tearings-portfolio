<template>
  <transition
    enter-active-class="animate__animated animate__flipInX"
    leave-active-class="animate__animated animate__flipOutX"
  >
    <button
      class="fixed bottom-10 right-10 rounded-full shadow-lg bg-sky-500 z-50"
      @click="scrollToTop"
      v-if="isHidden"
    >
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="svg5130"
        preserveAspectRatio="xMidYMid"
        class="text-white"
      >
        <defs id="defs6288"></defs>
        <g transform="rotate(180, 12, 12)">
          <path
            d="M 12 8 L 12 16"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="path8126"
          ></path>
          <path
            d="M 15 13 L 12 16 L 9 13"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="path4934"
          ></path>
        </g>
      </svg>
    </button>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      isHidden: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    handleScroll() {
      const currentScrollPosition = window.scrollY
      this.isHidden = currentScrollPosition > 100
    }
  }
})
</script>

<style scoped></style>
