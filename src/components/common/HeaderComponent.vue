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
            <router-link to="/" class="hover:underline">Home</router-link>
          </li>
          <li class="mx-2">
            <router-link to="/stack" class="hover:underline">Stack</router-link>
          </li>
          <li class="mx-2">
            <router-link to="/projects" class="hover:underline">Projects</router-link>
          </li>
          <li class="mx-2">
            <router-link to="/contact" class="hover:underline">Contact</router-link>
          </li>
        </ul>
      </nav>
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
