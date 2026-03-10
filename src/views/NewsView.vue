<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">COMMAND UPLINK // NEWS</h1>
          <p class="text-sm sm:text-lg opacity-70">Latest updates, devlogs, and announcements</p>
        </div>

        <!-- Featured Post -->
        <article 
          v-if="featuredPost"
          class="border-2 border-green-500 p-6 relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 bg-green-500 text-black px-4 py-1 text-xs font-bold">
            FEATURED
          </div>
          <div class="text-xs text-green-400 mb-2">{{ featuredPost.date }}</div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-3">{{ featuredPost.title }}</h2>
          <p class="opacity-80 mb-4">{{ featuredPost.excerpt }}</p>
          <div class="flex gap-2">
            <span 
              v-for="tag in featuredPost.tags" 
              :key="tag"
              class="text-xs px-2 py-0.5 border border-green-500"
            >
              {{ tag }}
            </span>
          </div>
        </article>

        <!-- News Feed -->
        <div class="space-y-4">
          <article 
            v-for="post in posts" 
            :key="post.id"
            class="border border-green-500 p-4 hover:bg-green-500/5 transition-colors group"
          >
            <div class="flex flex-col sm:flex-row sm:items-start gap-4">
              <!-- Date Column -->
              <div class="sm:w-24 flex-shrink-0">
                <div class="text-xs text-green-400 font-mono">{{ post.date }}</div>
                <div 
                  :class="[
                    'text-xs mt-1 px-2 py-0.5 inline-block',
                    post.type === 'devlog' ? 'bg-blue-500/20 text-blue-400' :
                    post.type === 'update' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  ]"
                >
                  {{ post.type.toUpperCase() }}
                </div>
              </div>

              <!-- Content -->
              <div class="flex-grow">
                <h3 class="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-sm opacity-70">{{ post.excerpt }}</p>
              </div>
            </div>
          </article>
        </div>

        <!-- Load More -->
        <div class="text-center">
          <button 
            class="border border-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition-colors cursor-pointer"
            @click="loadMore"
          >
            [ LOAD MORE TRANSMISSIONS ]
          </button>
        </div>

        <!-- Subscribe Section -->
        <section class="border border-green-500/50 p-4 text-center">
          <h3 class="font-bold mb-2">📡 SUBSCRIBE TO UPLINK</h3>
          <p class="text-sm opacity-70 mb-4">Stay updated with the latest news and devlogs</p>
          <div class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com"
              class="flex-grow px-4 py-2 bg-black border border-green-500 text-green-500 placeholder-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500"
              aria-label="Email address for newsletter subscription"
            />
            <button 
              class="px-6 py-2 bg-green-500 text-black font-bold hover:bg-green-400 transition-colors cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </div>
        </section>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  type: 'devlog' | 'update' | 'announcement'
  tags?: string[]
}

const featuredPost = ref<Post>({
  id: 0,
  title: 'Portfolio v2.0 Launch - CRT Terminal Edition',
  excerpt: 'After months of development, I\'m excited to announce the launch of my new portfolio website featuring a retro CRT terminal aesthetic, interactive globe navigation, and a completely redesigned user experience.',
  date: 'MAR 2026',
  type: 'announcement',
  tags: ['Vue.js', 'D3.js', 'Portfolio', 'Launch']
})

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Building an Interactive Globe with D3.js',
    excerpt: 'A deep dive into creating the interactive globe component using D3.js orthographic projection.',
    date: 'FEB 2026',
    type: 'devlog'
  },
  {
    id: 2,
    title: 'CRT Effects with Pure CSS',
    excerpt: 'How I achieved the authentic CRT monitor look using CSS animations and filters.',
    date: 'FEB 2026',
    type: 'devlog'
  },
  {
    id: 3,
    title: 'New Project: CI/CD Pipeline Optimization',
    excerpt: 'Started working on improving deployment workflows with Docker and GitHub Actions.',
    date: 'JAN 2026',
    type: 'update'
  },
  {
    id: 4,
    title: 'Vue 3 Composition API Best Practices',
    excerpt: 'Lessons learned from refactoring components to use the Composition API.',
    date: 'JAN 2026',
    type: 'devlog'
  }
])

function loadMore() {
  // Simulating loading more posts
  posts.value.push({
    id: posts.value.length + 1,
    title: 'Archive Post #' + (posts.value.length + 1),
    excerpt: 'This is an archived transmission from the past...',
    date: 'DEC 2025',
    type: 'update'
  })
}
</script>

<style scoped></style>
