<template>
  <header
    class="flex items-center p-10"
    :class="[
      'fixed top-0 left-0 w-full transition-transform duration-300',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="text-white">
      <h1
        class="text-2xl font-bold bg-gradient-to-r from-sky-500 to-emerald-400 inline-block text-transparent bg-clip-text"
      >
        DavidTorrubia.dev
      </h1>
    </div>

    <div class="ml-auto">
      <nav class="text-white p-4">
        <ul class="flex justify-center">
          <li class="mx-2">
            <button to="/" class="hover:underline" @click="scrollToSection('homeSection')">
              Home
            </button>
          </li>
          <li class="mx-2">
            <button class="hover:underline" @click="scrollToSection('stackSection')">Stack</button>
          </li>
          <li class="mx-2">
            <button class="hover:underline" @click="scrollToSection('proyectsSection')">
              Projects
            </button>
          </li>
          <li class="mx-2">
            <button class="hover:underline" @click="scrollToSection('contactSection')">
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isHidden: false,
      lastScrollPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.scrollY
      this.isHidden = currentScrollPosition > 1 // Ajusta este valor según cuando quieras que el header desaparezca
    },
    scrollToSection(name: any) {
      this.$emit('scroll-to-section', name)
    }
  }
})
</script>

<style scoped></style>
