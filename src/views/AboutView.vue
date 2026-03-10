<template>
  <main>
    <SectionComponent @section-mounted="handleSectionMounted">
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">DOSSIER // DAVID TORRUBIA</h1>
          <p class="text-sm sm:text-lg opacity-70">Software Engineer & Full Stack Developer</p>
        </div>

        <!-- About Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Bio -->
          <div class="border border-green-500 p-4">
            <h2 class="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span class="text-green-400">[</span> PROFILE <span class="text-green-400">]</span>
            </h2>
            <p class="text-sm sm:text-base leading-relaxed">
              Passionate software engineer with expertise in full-stack development, DevOps, and game development. 
              I thrive on solving complex problems and building elegant solutions that make a real impact.
              Always eager to learn new technologies and share knowledge with the community.
            </p>
          </div>

          <!-- Quick Stats -->
          <div class="border border-green-500 p-4">
            <h2 class="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span class="text-green-400">[</span> STATS <span class="text-green-400">]</span>
            </h2>
            <ul class="space-y-2 text-sm sm:text-base">
              <li class="flex justify-between border-b border-green-500/30 pb-1">
                <span>Location:</span>
                <span class="text-green-400">Madrid, Spain</span>
              </li>
              <li class="flex justify-between border-b border-green-500/30 pb-1">
                <span>Experience:</span>
                <span class="text-green-400">5+ Years</span>
              </li>
              <li class="flex justify-between border-b border-green-500/30 pb-1">
                <span>Specialization:</span>
                <span class="text-green-400">Full Stack / DevOps</span>
              </li>
              <li class="flex justify-between">
                <span>Status:</span>
                <span class="text-green-400 animate-pulse">ACTIVE</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="border border-green-500 p-4">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span class="text-green-400">[</span> TECHNICAL SKILLS <span class="text-green-400">]</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Frontend -->
            <div>
              <h3 class="font-bold text-green-400 mb-2">// Frontend</h3>
              <ul class="space-y-1 text-sm">
                <li v-for="skill in frontendSkills" :key="skill" class="flex items-center gap-2">
                  <span class="text-green-500">►</span> {{ skill }}
                </li>
              </ul>
            </div>
            
            <!-- Backend -->
            <div>
              <h3 class="font-bold text-green-400 mb-2">// Backend</h3>
              <ul class="space-y-1 text-sm">
                <li v-for="skill in backendSkills" :key="skill" class="flex items-center gap-2">
                  <span class="text-green-500">►</span> {{ skill }}
                </li>
              </ul>
            </div>
            
            <!-- DevOps & Tools -->
            <div>
              <h3 class="font-bold text-green-400 mb-2">// DevOps & Tools</h3>
              <ul class="space-y-1 text-sm">
                <li v-for="skill in devopsSkills" :key="skill" class="flex items-center gap-2">
                  <span class="text-green-500">►</span> {{ skill }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Interests -->
        <section class="border border-green-500 p-4">
          <h2 class="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
            <span class="text-green-400">[</span> INTERESTS <span class="text-green-400">]</span>
          </h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="interest in interests" 
              :key="interest"
              class="px-3 py-1 border border-green-500 text-sm hover:bg-green-500 hover:text-black transition-colors"
            >
              {{ interest }}
            </span>
          </div>
        </section>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

const frontendSkills = ref([
  'Vue.js / Nuxt.js',
  'React / Next.js',
  'TypeScript',
  'Tailwind CSS',
  'HTML5 / CSS3'
])

const backendSkills = ref([
  'Node.js / Express',
  'Python / Django',
  'Java / Spring',
  'PostgreSQL / MongoDB',
  'REST / GraphQL APIs'
])

const devopsSkills = ref([
  'Docker / Kubernetes',
  'CI/CD Pipelines',
  'AWS / Azure',
  'Linux Administration',
  'Git / GitHub Actions'
])

const interests = ref([
  'Game Development',
  'Open Source',
  'Machine Learning',
  'Cybersecurity',
  'System Architecture',
  'UI/UX Design'
])

function handleSectionMounted() {
  // Section animation completed
}
</script>

<style scoped></style>
