<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <ViewHeader
          title="OP-STATUS // AVAILABILITY"
          subtitle="Current operational status and booking information"
        />

        <!-- Status Indicator -->
        <div class="border-2 border-green-500 p-6 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10 bg-green-500"></div>
          <div class="relative z-10">
            <div
              :class="[
                'text-6xl sm:text-8xl font-bold mb-4',
                isAvailable ? 'text-green-500' : 'text-green-500/50'
              ]"
            >
              {{ isAvailable ? 'ONLINE' : 'OFFLINE' }}
            </div>
            <p class="text-lg opacity-70">
              {{ isAvailable
                ? 'Currently accepting new projects and collaborations'
                : 'Not currently available for new projects'
              }}
            </p>
            <div class="flex items-center justify-center gap-2 mt-4">
              <span
                :class="[
                  'w-3 h-3 rounded-full',
                  isAvailable ? 'bg-green-500 animate-pulse' : 'bg-green-500/30'
                ]"
              ></span>
              <span class="text-sm">Last updated: {{ lastUpdated }}</span>
            </div>
          </div>
        </div>

        <!-- Availability Schedule -->
        <ContentSection title="WEEKLY SCHEDULE">
          <div class="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
            <div
              v-for="day in weekDays"
              :key="day.name"
              :class="[
                'p-2 border',
                day.available ? 'border-green-500 bg-green-500/20' : 'border-green-500/30 opacity-50'
              ]"
            >
              <div class="font-bold">{{ day.name }}</div>
              <div class="text-xs mt-1">{{ day.hours }}</div>
            </div>
          </div>
          <p class="text-xs text-center mt-2 opacity-50">Timezone: CET (Central European Time)</p>
        </ContentSection>

        <!-- Services -->
        <!-- <ContentSection title="AVAILABLE SERVICES">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="service in services"
              :key="service.name"
              class="border border-green-500/50 p-4 hover:border-green-500 transition-colors"
            >
              <div class="flex items-start justify-between">
                <h3 class="font-bold">{{ service.name }}</h3>
                <TagBadge :variant="service.available ? 'outline' : 'solid'" class="opacity-50">
                  {{ service.available ? 'OPEN' : 'CLOSED' }}
                </TagBadge>
              </div>
              <p class="text-sm opacity-70 mt-2">{{ service.description }}</p>
            </div>
          </div>
        </ContentSection> -->

        <!-- Response Time -->
        <ContentSection class="text-center">
          <h2 class="text-xl font-bold mb-2">[TIME] ESTIMATED RESPONSE TIME</h2>
          <div class="text-4xl font-bold text-green-400 my-4">{{ responseTime }}</div>
          <p class="text-sm opacity-70">For urgent matters, mention "PRIORITY" in your message</p>
        </ContentSection>

        <!-- CTA -->
        <div class="text-center">
          <router-link
            to="/contact"
            class="inline-block border-2 border-green-500 px-8 py-3 font-bold hover:bg-green-500 hover:text-black transition-colors"
          >
            [ INITIATE CONTACT ]
          </router-link>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script setup lang="ts">
import SectionComponent from '@/components/common/SectionComponent.vue'
import ViewHeader from '@/components/common/ViewHeader.vue'
import ContentSection from '@/components/common/ContentSection.vue'
// import TagBadge from '@/components/common/TagBadge.vue'

const isAvailable = true
const lastUpdated = 'March 2026'
const responseTime = '< 24 hours'

const weekDays = [
  { name: 'MON', hours: '9-18', available: true },
  { name: 'TUE', hours: '9-18', available: true },
  { name: 'WED', hours: '9-18', available: true },
  { name: 'THU', hours: '9-18', available: true },
  { name: 'FRI', hours: '9-17', available: true },
  { name: 'SAT', hours: 'Off', available: false },
  { name: 'SUN', hours: 'Off', available: false }
]

// const services = [
//   { name: 'Full-Stack Development', description: 'End-to-end web application development with modern frameworks.', available: true },
//   { name: 'DevOps Consulting', description: 'CI/CD pipelines, containerization, and cloud infrastructure.', available: true },
//   { name: 'Code Review & Audit', description: 'In-depth code review and security auditing services.', available: true },
//   { name: 'Technical Mentoring', description: '1-on-1 mentoring sessions for developers.', available: false }
// ]
</script>

<style scoped></style>
