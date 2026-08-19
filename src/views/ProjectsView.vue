<script setup lang="ts">
import { ref, watch } from "vue";

const searchQuery = ref("");

watch(searchQuery, (newQuery) => {
  handleSearchInput(newQuery);
});

function handleSearchInput(newQuery: string) {
  filteredProjects.value = projects.value.filter(
    (project) =>
      project.title.toLowerCase().includes(newQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(newQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(newQuery.toLowerCase()),
      ),
  );
}

function openProject(project: Project) {
  if (project.url && typeof window !== "undefined") {
    window.open(project.url, "_blank");
  }
}

class Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;

  constructor(title: string, description: string, tags: string[]) {
    this.title = title;
    this.description = description;
    this.tags = tags;
  }
}

const projects = ref<Project[]>([
  new Project("Test Project", "Short description of project 1", [
    "#C#",
    "#Unity",
    "#Simulation",
  ]),
  new Project("Project 2", "Short description of project 2", [
    "#tag1",
    "#tag2",
    "#tag3",
  ]),
  new Project("Project 3", "Short description of project 3", [
    "#tag1",
    "#tag2",
    "#tag3",
  ]),
  new Project("Project 3", "Short description of project 3", [
    "#tag1",
    "#tag2",
    "#tag3",
  ]),
  new Project("Project 3", "Short description of project 3", [
    "#tag1",
    "#tag2",
    "#tag3",
  ]),
  new Project("Project 3", "Short description of project 3", [
    "#tag1",
    "#tag2",
    "#tag3",
  ]),
]);

const filteredProjects = ref<Project[]>(projects.value);
</script>

<template>
  <main class="flex flex-col px-5 py-8 md:px-8 gap-4">
    <div>
      <input
        class="bg-transparent border border-white/20 placeholder:text-white/50 text-white focus:outline-none w-full rounded-lg px-4 py-2"
        placeholder="Search projects..."
        v-model="searchQuery"
      />
    </div>
    <div
      class="flex flex-col gap-4 overflow-auto divide-solid custom-scrollbar mask-[linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)] h-full py-4"
      v-if="filteredProjects.length !== 0"
    >
      <div
        class="flex flex-col text-white gap-1 cursor-pointer border border-white/20 p-2 rounded-lg transition-all duration-200"
        v-for="project in filteredProjects"
        :key="project.title"
        :click="openProject(project)"
      >
        <h1 class="font-terminal font-medium">{{ project.title }}</h1>
        <p class="text-white/70">
          {{ project.description }}
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
      No projects found.
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
