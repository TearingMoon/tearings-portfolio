<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">BLACK-OPS LAB // EXPERIMENTS</h1>
          <p class="text-sm sm:text-lg opacity-70">Classified projects and work-in-progress concepts</p>
          <div class="flex items-center justify-center gap-2 mt-2">
            <span class="animate-pulse text-yellow-500">●</span>
            <span class="text-xs text-yellow-500">CLEARANCE LEVEL: PUBLIC</span>
          </div>
        </div>

        <!-- Warning Banner -->
        <div class="border border-yellow-500 bg-yellow-500/10 p-4 text-center">
          <p class="text-yellow-500 font-bold">⚠️ EXPERIMENTAL ZONE ⚠️</p>
          <p class="text-sm opacity-70 mt-1">Projects below are in various stages of development. Features may be incomplete or unstable.</p>
        </div>

        <!-- Experiments Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article 
            v-for="experiment in experiments" 
            :key="experiment.id"
            class="border border-green-500 overflow-hidden group"
          >
            <!-- Status Bar -->
            <div 
              :class="[
                'px-4 py-2 text-xs font-bold flex justify-between items-center',
                experiment.status === 'active' ? 'bg-green-500/20' :
                experiment.status === 'paused' ? 'bg-yellow-500/20' :
                'bg-red-500/20'
              ]"
            >
              <span>{{ experiment.codename }}</span>
              <span 
                :class="[
                  experiment.status === 'active' ? 'text-green-500' :
                  experiment.status === 'paused' ? 'text-yellow-500' :
                  'text-red-500'
                ]"
              >
                {{ experiment.status.toUpperCase() }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                {{ experiment.name }}
              </h3>
              <p class="text-sm opacity-70 mb-4">{{ experiment.description }}</p>

              <!-- Progress -->
              <div class="mb-4">
                <div class="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{{ experiment.progress }}%</span>
                </div>
                <div class="h-2 border border-green-500 bg-black">
                  <div 
                    class="h-full bg-green-500 transition-all duration-500"
                    :style="{ width: `${experiment.progress}%` }"
                  ></div>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in experiment.tags" 
                  :key="tag"
                  class="text-xs px-2 py-0.5 border border-green-500/50"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Ideas Section -->
        <section class="border border-green-500/50 border-dashed p-4">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="text-green-400">[</span> CONCEPT QUEUE <span class="text-green-400">]</span>
          </h2>
          <ul class="space-y-2 text-sm">
            <li v-for="idea in ideas" :key="idea" class="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <span class="text-green-500">?</span> {{ idea }}
            </li>
          </ul>
        </section>
      </div>
    </SectionComponent>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

interface Experiment {
  id: number
  codename: string
  name: string
  description: string
  progress: number
  status: 'active' | 'paused' | 'archived'
  tags: string[]
}

const experiments = ref<Experiment[]>([
  {
    id: 1,
    codename: 'PROJECT-ATLAS',
    name: '3D Portfolio Globe',
    description: 'Interactive 3D globe with WebGL for enhanced portfolio visualization and navigation.',
    progress: 75,
    status: 'active',
    tags: ['WebGL', 'Three.js', 'Interactive']
  },
  {
    id: 2,
    codename: 'PROJECT-ECHO',
    name: 'AI Chat Assistant',
    description: 'Implementing an AI-powered chatbot to answer questions about my work and experience.',
    progress: 30,
    status: 'paused',
    tags: ['AI', 'NLP', 'Chat']
  },
  {
    id: 3,
    codename: 'PROJECT-SHADOW',
    name: 'Dark Mode CRT',
    description: 'Alternative amber/orange CRT theme with phosphor decay effects.',
    progress: 50,
    status: 'active',
    tags: ['CSS', 'Animation', 'Theme']
  },
  {
    id: 4,
    codename: 'PROJECT-NEXUS',
    name: 'Live Code Editor',
    description: 'Embedded code editor for interactive coding demonstrations.',
    progress: 15,
    status: 'paused',
    tags: ['Monaco', 'WebContainers', 'Demo']
  }
])

const ideas = ref([
  'Real-time multiplayer terminal game',
  'Voice command navigation',
  'AR business card integration',
  'Procedurally generated background art',
  'Blog with markdown support'
])
</script>

<style scoped></style>
