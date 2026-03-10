<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">SERVICE RECORD // ACHIEVEMENTS</h1>
          <p class="text-sm sm:text-lg opacity-70">Documented milestones and certifications</p>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="stat in stats" 
            :key="stat.label"
            class="border border-green-500 p-4 text-center"
          >
            <div class="text-2xl sm:text-4xl font-bold text-green-400">{{ stat.value }}</div>
            <div class="text-xs sm:text-sm opacity-70">{{ stat.label }}</div>
          </div>
        </div>

        <!-- Achievements Timeline -->
        <section class="border border-green-500 p-4">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span class="text-green-400">[</span> TIMELINE <span class="text-green-400">]</span>
          </h2>
          
          <div class="space-y-4">
            <div 
              v-for="achievement in achievements" 
              :key="achievement.id"
              class="flex gap-4 border-l-2 border-green-500 pl-4 hover:bg-green-500/5 transition-colors py-2"
            >
              <div class="flex-shrink-0 text-green-400 font-mono text-sm">
                {{ achievement.date }}
              </div>
              <div class="flex-grow">
                <h3 class="font-bold flex items-center gap-2">
                  <span :class="['text-lg', achievement.icon]">{{ achievement.iconChar }}</span>
                  {{ achievement.title }}
                </h3>
                <p class="text-sm opacity-70 mt-1">{{ achievement.description }}</p>
                <span 
                  class="inline-block mt-2 text-xs px-2 py-0.5 border border-green-500/50 bg-green-500/10"
                >
                  {{ achievement.category }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications -->
        <section class="border border-green-500 p-4">
          <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
            <span class="text-green-400">[</span> CERTIFICATIONS <span class="text-green-400">]</span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="cert in certifications" 
              :key="cert.name"
              class="border border-green-500/50 p-4 flex items-start gap-3 hover:border-green-500 transition-colors"
            >
              <div class="text-2xl">🏅</div>
              <div>
                <h3 class="font-bold">{{ cert.name }}</h3>
                <p class="text-sm text-green-400">{{ cert.issuer }}</p>
                <p class="text-xs opacity-50 mt-1">{{ cert.date }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

interface Achievement {
  id: number
  title: string
  description: string
  date: string
  category: string
  iconChar: string
}

interface Certification {
  name: string
  issuer: string
  date: string
}

const stats = ref([
  { value: '5+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '10+', label: 'Technologies' },
  { value: '∞', label: 'Lines of Code' }
])

const achievements = ref<Achievement[]>([
  {
    id: 1,
    title: 'Full Stack Developer Role',
    description: 'Promoted to lead full-stack development for enterprise applications.',
    date: '2024',
    category: 'Career',
    iconChar: '⭐'
  },
  {
    id: 2,
    title: 'Open Source Contributor',
    description: 'Active contributor to multiple open-source projects with 100+ GitHub contributions.',
    date: '2023',
    category: 'Community',
    iconChar: '🌟'
  },
  {
    id: 3,
    title: 'DevOps Pipeline Optimization',
    description: 'Reduced deployment time by 60% through CI/CD pipeline improvements.',
    date: '2023',
    category: 'Technical',
    iconChar: '🚀'
  },
  {
    id: 4,
    title: 'Bachelor\'s Degree in Computer Science',
    description: 'Graduated with honors in Computer Science and Software Engineering.',
    date: '2021',
    category: 'Education',
    iconChar: '🎓'
  },
  {
    id: 5,
    title: 'First Production Deployment',
    description: 'Successfully launched first production application serving 10K+ users.',
    date: '2020',
    category: 'Career',
    iconChar: '🎯'
  }
])

const certifications = ref<Certification[]>([
  { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
  { name: 'Docker Certified Associate', issuer: 'Docker Inc.', date: '2022' },
  { name: 'Vue.js Developer Certification', issuer: 'Vue School', date: '2022' },
  { name: 'Kubernetes Administrator', issuer: 'CNCF', date: '2023' }
])
</script>

<style scoped></style>
