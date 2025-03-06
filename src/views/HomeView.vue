<template>
  <main>
    <WelcomeComponent />
    <AboutComponent />
    <ProjectsComponent />
    <ContactComponent />
  </main>
</template>

<script lang="ts" setup>
import WelcomeComponent from '@/components/views/home/WelcomeComponent.vue'
import AboutComponent from '@/components/views/home/AboutComponent.vue'
import ProjectsComponent from '@/components/views/home/ProjectsComponent.vue'
import ContactComponent from '@/components/views/home/ContactComponent.vue'
</script>

<style scoped></style>
