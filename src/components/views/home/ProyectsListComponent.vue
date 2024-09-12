<template>
  <!-- Search Filter -->
  <div class="flex flex-row justify-center items-center text-xl flex-wrap mb-10">
    <button
      :class="currentFilterCategory === 'Defense' ? 'text-white' : 'text-white/50'"
      class="hover:text-white transition duration-150"
      @click="currentFilterCategory = 'Defense'"
    >
      Defense
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      :class="currentFilterCategory === 'Web' ? 'text-white' : 'text-white/50'"
      class="hover:text-white transition duration-150"
      @click="currentFilterCategory = 'Web'"
    >
      Web
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      :class="currentFilterCategory === 'Systems' ? 'text-white' : 'text-white/50'"
      class="hover:text-white transition duration-150"
      @click="currentFilterCategory = 'Systems'"
    >
      Systems
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      :class="currentFilterCategory === 'AI' ? 'text-white' : 'text-white/50'"
      class="hover:text-white transition duration-150"
      @click="currentFilterCategory = 'AI'"
    >
      AI
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      :class="currentFilterCategory === 'Hackatons' ? 'text-white' : 'text-white/50'"
      class="hover:text-white transition duration-150"
      @click="currentFilterCategory = 'Hackatons'"
    >
      Hackatons
    </button>
  </div>
  <!-- Proyect List -->
  <div class="flex flex-row flex-wrap flex-1 w-full justify-center gap-10 min-h-36">
    <TransitionGroup
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <ProyectsListItemComponent
        v-for="(proyect, index) in proyectList.filter((proyect) =>
          proyect.categories.includes(currentFilterCategory)
        )"
        :key="index"
        :title="proyect.title"
        :categories="proyect.categories"
        :description="proyect.description"
        :technologies="proyect.technologies"
        :link="proyect.link"
      >
      </ProyectsListItemComponent>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProyectsListItemComponent from './ProyectsListItemComponent.vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {
      currentFilterCategory: 'Web',
      proyectList: [
        {
          title: 'Radar Display',
          description:
            'Personal project to display radar data in a more visual way. It was developed by personal research and designed for defense uses.',
          technologies: 'Lua',
          categories: ['Defense', 'Systems', 'Personal'],
          link: 'https://github.com/TearingMoon/StormWorks-Microcontrollers/tree/main/Refined%20Radar%20Controller'
        },
        {
          title: 'Slou Web Page',
          description:
            "A web page developed for a family member's company. It was developed using Vue.js and TailwindCSS.",
          technologies: 'Vue.js, Tailwind.',
          categories: ['Web', 'Personal', 'Professional'],
          link: 'https://sloupeluqueros.com/'
        },
        {
          title: 'NASA Space Apps 2022 Zaragoza AI (3rd Place)',
          description:
            'A NLP AI developed for the NASA Space Apps hackaton. It was developed using React.js and Python with OpenSearch. It was designed to filter and search for information in a more human way inside the NASA documentation.',
          technologies: 'React.js, Python, OpenSearch.',
          categories: ['Web', 'Personal', 'Hackatons', 'AI'],
          link: ''
        },
        {
          title: 'CodeLabs Zaragoza Bruteforce 2024 (1st Place)',
          description:
            'A bruteforce Computer Interface developed for the CodeLabs Zaragoza hackaton. It was developed in a team of 4 people and it was designed to find the best path between certain cities in spain with the best setting.',
          technologies: 'C#, .NET',
          categories: ['Personal', 'Hackatons'],
          link: 'https://github.com/TearingMoon/CodeLabHackaton'
        },
        {
          title: 'IncogniMode',
          description:
            'A explorer extension developed for personal use and to learn more about the explorer extensions. It was developed using Vue.js and it was designed to manage certain tracking elements of the explorer its installed.',
          technologies: 'Vue.js',
          categories: ['Personal', 'Web', 'Systems'],
          link: 'https://github.com/TearingMoon/IncogniMode'
        }
      ]
    }
  },
  components: {
    ProyectsListItemComponent
  },
  methods: {}
})
</script>

<style scoped></style>
