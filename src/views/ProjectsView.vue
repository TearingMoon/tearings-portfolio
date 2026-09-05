<script setup lang="ts">
import { ref, computed } from "vue";

const searchQuery = ref("");

function openProject(project: Project) {
  console.log(`Opening project: ${project.title}`);
  window.open(project.url);
}

class Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;

  constructor(
    title: string,
    description: string,
    tags: string[],
    url?: string,
  ) {
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.url = url;
  }
}

const projects = ref<Project[]>([
  new Project(
    "Axion Engine",
    "projectList.axionEngine.description",
    ["#C++", "#SDL2", "#Engine", "#GameDev"],
    "https://github.com/TearingMoon/AxionEngine",
  ),
]);

const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return projects.value;
  }

  return projects.value.filter((project) => {
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
});
</script>

<template>
  <main class="flex flex-col px-5 py-8 md:px-8 gap-4">
    <div>
      <input
        class="bg-transparent border border-white/20 placeholder:text-white/50 text-white focus:outline-none w-full rounded-lg px-4 py-2"
        :placeholder="$t('projects.searchPlaceholder')"
        v-model="searchQuery"
      />
    </div>
    <div
      class="flex flex-col gap-4 overflow-auto divide-solid custom-scrollbar mask-[linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] h-full py-4"
      v-if="filteredProjects.length !== 0"
    >
      <div
        class="flex flex-col text-white gap-1 cursor-pointer border border-white/10 px-4 py-3 transition-all duration-200 hover:border-white/30 hover:bg-white/3 rounded-lg"
        v-for="project in filteredProjects"
        :key="project.title"
        @click="openProject(project)"
      >
        <h1 class="font-terminal font-medium">{{ project.title }}</h1>
        <p class="text-white/70">
          {{ $t(project.description) }}
        </p>
        <div class="flex flex-row gap-1">
          <span
            class="text-white/50 text-xs font-mono"
            v-for="tag in project.tags"
            :key="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="filteredProjects.length === 0"
      class="text-white/50 text-center mt-4 font-terminal"
    >
      {{ $t("projects.noResults") }}
    </div>
  </main>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
