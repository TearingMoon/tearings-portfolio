<template>
  <!-- Search Filter -->
  <div class="flex flex-row justify-center items-center text-xl flex-wrap mb-10">
    <button
      class="text-white/50 hover:text-white transition duration-150"
      @click="filterCategory = 'Defense'"
    >
      Defense
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      class="text-white/50 hover:text-white transition duration-150"
      @click="filterCategory = 'Web'"
    >
      Web
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      class="text-white/50 hover:text-white transition duration-150"
      @click="filterCategory = 'Systems'"
    >
      Systems
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      class="text-white/50 hover:text-white transition duration-150"
      @click="filterCategory = 'AI'"
    >
      AI
    </button>
    <span class="text-white/50 mx-4"> // </span>
    <button
      class="text-white/50 hover:text-white transition duration-150"
      @click="filterCategory = 'Hackatons'"
    >
      Hackatons
    </button>
  </div>
  <div class="flex flex-row flex-wrap flex-1 w-full justify-center gap-10 min-h-36">
    <ProyectsListItemComponent
      :categories="['Defense', 'Systems', 'Personal']"
      :filter-category="filterCategory"
      link="https://github.com/TearingMoon/StormWorks-Microcontrollers/tree/main/Refined%20Radar%20Controller"
    >
      <template #content> </template>
      <template #title> Radar Display</template>
      <template #description>
        Personal project to display radar data in a more visual way. It was developed by personal
        research and designed for defense uses.
      </template>
      <template #technologies> Lua </template>
    </ProyectsListItemComponent>
    <ProyectsListItemComponent
      :categories="['Web', 'Personal', 'Professional']"
      :filter-category="filterCategory"
      link=""
    >
      <template #content> </template>
      <template #title> Slou Web Page</template>
      <template #description>
        A web page developed for a family member's company. It was developed using Vue.js and
        TailwindCSS.
      </template>
      <template #technologies> Vue.js, Tailwind.</template>
    </ProyectsListItemComponent>
    <ProyectsListItemComponent
      :categories="['Web', 'Personal', 'Hackatons', 'AI']"
      :filter-category="filterCategory"
      link=""
    >
      <template #content> </template>
      <template #title> NASA Space Apps Zaragoza AI (3rd Place)</template>
      <template #description>
        A Nlp AI developed for the NASA Space Apps hackaton. It was developed using React.js and
        Python with OpenSearch. It was designed to filter and search for information in a more human
        way inside the NASA documentation.
      </template>
      <template #technologies> React.js, Python, OpenSearch.</template>
    </ProyectsListItemComponent>
    <ProyectsListItemComponent
      :categories="['Personal', 'Hackatons']"
      :filter-category="filterCategory"
      link=""
    >
      <template #content> </template>
      <template #title> CodeLabs Zaragoza Bruteforce (1st Place)</template>
      <template #description>
        A bruteforce Computer Interface developed for the CodeLabs Zaragoza hackaton. It was
        developed in a team of 4 people and it was designed to find the best path between certain
        cities in spain with the best setting.
      </template>
      <template #technologies> C#, .NET </template>
    </ProyectsListItemComponent>
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
      filterCategory: 'Defense'
    }
  },
  components: {
    ProyectsListItemComponent
  }
})
</script>

<style scoped></style>
