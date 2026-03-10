<template>
  <main>
    <SectionComponent @section-mounted="handleSectionMounted">
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <ViewHeader
          title="DOSSIER // DAVID TORRUBIA"
          subtitle="Software Engineer & Full Stack Developer"
        />

        <!-- About Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentSection title="PROFILE">
            <p class="text-sm sm:text-base leading-relaxed">
              Passionate software engineer with expertise in full-stack development, DevOps, and game development. 
              I thrive on solving complex problems and building elegant solutions that make a real impact.
              Always eager to learn new technologies and share knowledge with the community.
            </p>
          </ContentSection>

          <ContentSection title="STATS">
            <ul class="space-y-2 text-sm sm:text-base">
              <li
                v-for="(stat, index) in profileStats"
                :key="stat.label"
                :class="['flex justify-between pb-1', index < profileStats.length - 1 ? 'border-b border-green-500/30' : '']"
              >
                <span>{{ stat.label }}:</span>
                <span :class="['text-green-400', stat.pulse ? 'animate-pulse' : '']">{{ stat.value }}</span>
              </li>
            </ul>
          </ContentSection>
        </section>

        <!-- Skills Section -->
        <ContentSection title="TECHNICAL SKILLS">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="category in skillCategories" :key="category.title">
              <h3 class="font-bold text-green-400 mb-2">// {{ category.title }}</h3>
              <SkillList :items="category.skills" small />
            </div>
          </div>
        </ContentSection>

        <!-- Interests -->
        <ContentSection title="INTERESTS">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="interest in interests"
              :key="interest"
              class="px-3 py-1 border border-green-500 text-sm hover:bg-green-500 hover:text-black transition-colors"
            >
              {{ interest }}
            </span>
          </div>
        </ContentSection>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import SectionComponent from '@/components/common/SectionComponent.vue'
import ViewHeader from '@/components/common/ViewHeader.vue'
import ContentSection from '@/components/common/ContentSection.vue'
import SkillList from '@/components/common/SkillList.vue'

const profileStats = [
  { label: 'Location', value: 'Zaragoza, Spain' },
  { label: 'Experience', value: '5+ Years' },
  { label: 'Specialization', value: 'Full Stack / DevOps' },
  { label: 'Status', value: 'ACTIVE', pulse: true }
]

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Vue.js / Nuxt.js', 'React / Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3']
  },
  {
    title: 'Backend',
    skills: ['Node.js / Express', 'Python / Django', 'Java / Spring', 'PostgreSQL / MongoDB', 'REST / GraphQL APIs']
  },
  {
    title: 'DevOps & Tools',
    skills: ['Docker / Kubernetes', 'CI/CD Pipelines', 'AWS / Azure', 'Linux Administration', 'Git / GitHub Actions']
  }
]

const interests = [
  'Game Development',
  'Open Source',
  'Machine Learning',
  'Cybersecurity',
  'System Architecture',
  'UI/UX Design'
]

function handleSectionMounted() {
  // Section animation completed
}
</script>

<style scoped></style>
