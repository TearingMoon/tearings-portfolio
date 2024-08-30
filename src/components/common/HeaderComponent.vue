<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full transition-transform duration-300',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="text-white p-10">
      <h1
        class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 inline-block text-transparent bg-clip-text"
      >
        DavidTorrubia.dev
      </h1>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
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
    }
  }
})
</script>

<style scoped></style>
