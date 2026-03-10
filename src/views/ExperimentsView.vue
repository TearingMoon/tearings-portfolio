<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <ViewHeader
          title="BLACK-OPS LAB // EXPERIMENTS"
          subtitle="Classified projects and work-in-progress concepts"
        >
          <div class="flex items-center justify-center gap-2 mt-2">
            <span class="animate-pulse text-green-500">●</span>
            <span class="text-xs text-green-400">CLEARANCE LEVEL: PUBLIC</span>
          </div>
        </ViewHeader>

        <!-- Warning Banner -->
        <div class="border border-green-500 bg-green-500/10 p-4 text-center">
          <p class="text-green-400 font-bold">[!] EXPERIMENTAL ZONE [!]</p>
          <p class="text-sm opacity-70 mt-1">
            Projects below are in various stages of development. Features may be incomplete or
            unstable.
          </p>
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
                experiment.status === 'active'
                  ? 'bg-green-500/20'
                  : experiment.status === 'paused'
                    ? 'bg-green-500/10'
                    : 'bg-green-500/5'
              ]"
            >
              <span>{{ experiment.codename }}</span>
              <span
                :class="[
                  experiment.status === 'active'
                    ? 'text-green-500'
                    : experiment.status === 'paused'
                      ? 'text-green-500/70'
                      : 'text-green-500/40'
                ]"
              >
                {{ experiment.status.toUpperCase() }}
              </span>
            </div>

            <div class="p-4">
              <h3 class="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                {{ experiment.name }}
              </h3>
              <p class="text-sm opacity-70 mb-4">{{ experiment.description }}</p>

              <ProgressBar :value="experiment.progress" label="Progress" show-label />

              <div class="flex flex-wrap gap-1">
                <TagBadge v-for="tag in experiment.tags" :key="tag">#{{ tag }}</TagBadge>
              </div>
            </div>
          </article>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script setup lang="ts">
import SectionComponent from '@/components/common/SectionComponent.vue'
import ViewHeader from '@/components/common/ViewHeader.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import TagBadge from '@/components/common/TagBadge.vue'

interface Experiment {
  id: number
  codename: string
  name: string
  description: string
  progress: number
  status: 'active' | 'paused' | 'archived'
  tags: string[]
}

const experiments: Experiment[] = [
  // {
  //   id: 1,
  //   codename: 'PROJECT-ATLAS',
  //   name: '3D Portfolio Globe',
  //   description:
  //     'Interactive 3D globe with WebGL for enhanced portfolio visualization and navigation.',
  //   progress: 75,
  //   status: 'active',
  //   tags: ['WebGL', 'Three.js', 'Interactive']
  // },
  // {
  //   id: 2,
  //   codename: 'PROJECT-ECHO',
  //   name: 'AI Chat Assistant',
  //   description:
  //     'Implementing an AI-powered chatbot to answer questions about my work and experience.',
  //   progress: 30,
  //   status: 'paused',
  //   tags: ['AI', 'NLP', 'Chat']
  // },
  // {
  //   id: 3,
  //   codename: 'PROJECT-SHADOW',
  //   name: 'Dark Mode CRT',
  //   description: 'Alternative amber/orange CRT theme with phosphor decay effects.',
  //   progress: 50,
  //   status: 'active',
  //   tags: ['CSS', 'Animation', 'Theme']
  // },
  // {
  //   id: 4,
  //   codename: 'PROJECT-NEXUS',
  //   name: 'Live Code Editor',
  //   description: 'Embedded code editor for interactive coding demonstrations.',
  //   progress: 15,
  //   status: 'paused',
  //   tags: ['Monaco', 'WebContainers', 'Demo']
  // }
]
</script>

<style scoped></style>
