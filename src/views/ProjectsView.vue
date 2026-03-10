<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">OPS-CATALOG // PROJECTS</h1>
          <p class="text-sm sm:text-lg opacity-70">Browse through my completed missions and operations</p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2 justify-center">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="activeCategory = category"
            :class="[
              'px-4 py-2 border border-green-500 transition-all duration-300 cursor-pointer',
              activeCategory === category 
                ? 'bg-green-500 text-black font-bold' 
                : 'hover:bg-green-500/20'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <article 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="border border-green-500 p-4 hover:bg-green-500/10 transition-all duration-300 group"
          >
            <!-- Project Header -->
            <div class="flex items-start justify-between mb-3">
              <h3 class="font-bold text-lg group-hover:text-green-400 transition-colors">
                {{ project.name }}
              </h3>
              <span 
                :class="[
                  'text-xs px-2 py-1 border',
                  project.status === 'completed' ? 'border-green-500 text-green-500' :
                  project.status === 'in-progress' ? 'border-yellow-500 text-yellow-500' :
                  'border-red-500 text-red-500'
                ]"
              >
                {{ project.status.toUpperCase() }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-sm opacity-80 mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-1 mb-4">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/50"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div class="flex gap-2 mt-auto">
              <a 
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-black transition-colors"
                :aria-label="`View ${project.name} on GitHub`"
              >
                [GitHub]
              </a>
              <a 
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm border border-green-500 px-3 py-1 hover:bg-green-500 hover:text-black transition-colors"
                :aria-label="`View ${project.name} live demo`"
              >
                [Live Demo]
              </a>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-10 opacity-70">
          <p class="text-2xl mb-2">[NO DATA FOUND]</p>
          <p>No projects match the selected category.</p>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

interface Project {
  id: number
  name: string
  description: string
  category: string
  status: 'completed' | 'in-progress' | 'archived'
  technologies: string[]
  github?: string
  demo?: string
}

const activeCategory = ref('All')

const categories = ['All', 'Web', 'Games', 'DevOps', 'Open Source']

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Portfolio CRT Terminal',
    description: 'A retro-styled portfolio website with CRT effects, interactive globe map, and terminal aesthetics. Built with Vue 3 and TypeScript.',
    category: 'Web',
    status: 'completed',
    technologies: ['Vue.js', 'TypeScript', 'D3.js', 'Tailwind CSS'],
    github: 'https://github.com/TearingMoon/tearings-portfolio'
  },
  {
    id: 2,
    name: 'CI/CD Pipeline Automation',
    description: 'Automated deployment pipeline with Docker containerization, testing, and multi-environment deployment strategies.',
    category: 'DevOps',
    status: 'completed',
    technologies: ['Docker', 'GitHub Actions', 'AWS', 'Terraform']
  },
  {
    id: 3,
    name: 'Indie Game Project',
    description: 'A 2D action-adventure game with procedural generation and pixel art aesthetics. Currently in active development.',
    category: 'Games',
    status: 'in-progress',
    technologies: ['Unity', 'C#', 'Aseprite']
  },
  {
    id: 4,
    name: 'Open Source CLI Tool',
    description: 'Command-line utility for developers to streamline common development workflows and automate repetitive tasks.',
    category: 'Open Source',
    status: 'completed',
    technologies: ['Node.js', 'TypeScript', 'Commander.js'],
    github: 'https://github.com/TearingMoon'
  },
  {
    id: 5,
    name: 'API Gateway Service',
    description: 'Microservices architecture with API gateway, authentication, rate limiting, and service discovery.',
    category: 'Web',
    status: 'completed',
    technologies: ['Node.js', 'Express', 'Redis', 'PostgreSQL']
  },
  {
    id: 6,
    name: 'Infrastructure as Code',
    description: 'Complete infrastructure setup using Terraform and Ansible for cloud-native applications deployment.',
    category: 'DevOps',
    status: 'in-progress',
    technologies: ['Terraform', 'Ansible', 'Kubernetes', 'Helm']
  }
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects.value
  }
  return projects.value.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
