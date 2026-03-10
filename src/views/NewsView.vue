<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <ViewHeader
          title="COMMAND UPLINK // NEWS"
          subtitle="Latest updates, devlogs, and announcements"
        />

        <!-- Featured Post -->
        <article v-if="featuredPost" class="border-2 border-green-500 p-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-green-500 text-black px-4 py-1 text-xs font-bold">
            FEATURED
          </div>
          <div class="text-xs text-green-400 mb-2">{{ featuredPost.date }}</div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-3">{{ featuredPost.title }}</h2>
          <p class="opacity-80 mb-4">{{ featuredPost.excerpt }}</p>
          <div class="flex gap-2">
            <TagBadge v-for="tag in featuredPost.tags" :key="tag">{{ tag }}</TagBadge>
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
              <div class="sm:w-24 flex-shrink-0">
                <div class="text-xs text-green-400 font-mono">{{ post.date }}</div>
                <div
                  :class="[
                    'text-xs mt-1 px-2 py-0.5 inline-block border border-green-500/50',
                    post.type === 'devlog'
                      ? 'text-green-400'
                      : post.type === 'update'
                        ? 'text-green-500'
                        : 'text-green-300'
                  ]"
                >
                  {{ post.type.toUpperCase() }}
                </div>
              </div>

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
        <!-- <div class="text-center">
          <button
            class="border border-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition-colors cursor-pointer"
            @click="loadMore"
          >
            [ LOAD MORE TRANSMISSIONS ]
          </button>
        </div> -->
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'
import ViewHeader from '@/components/common/ViewHeader.vue'
import TagBadge from '@/components/common/TagBadge.vue'

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  type: 'devlog' | 'update' | 'announcement'
  tags?: string[]
}

const featuredPost: Post = {
  id: 0,
  title: 'Portfolio v2.0 Launch - CRT Terminal Edition',
  excerpt:
    "After months of development, I'm excited to announce the launch of my new portfolio website featuring a retro CRT terminal aesthetic, interactive globe navigation, and a completely redesigned user experience.",
  date: 'MAR 2026',
  type: 'announcement',
  tags: ['Vue.js', 'D3.js', 'Portfolio', 'Launch']
}

const posts = ref<Post[]>([
  // {
  //   id: 1,
  //   title: 'Building an Interactive Globe with D3.js',
  //   excerpt:
  //     'A deep dive into creating the interactive globe component using D3.js orthographic projection.',
  //   date: 'FEB 2026',
  //   type: 'devlog'
  // },
  // {
  //   id: 2,
  //   title: 'CRT Effects with Pure CSS',
  //   excerpt: 'How I achieved the authentic CRT monitor look using CSS animations and filters.',
  //   date: 'FEB 2026',
  //   type: 'devlog'
  // },
  // {
  //   id: 3,
  //   title: 'New Project: CI/CD Pipeline Optimization',
  //   excerpt: 'Started working on improving deployment workflows with Docker and GitHub Actions.',
  //   date: 'JAN 2026',
  //   type: 'update'
  // },
  // {
  //   id: 4,
  //   title: 'Vue 3 Composition API Best Practices',
  //   excerpt: 'Lessons learned from refactoring components to use the Composition API.',
  //   date: 'JAN 2026',
  //   type: 'devlog'
  // }
])

// function loadMore() {
//   posts.value.push({
//     id: posts.value.length + 1,
//     title: 'Archive Post #' + (posts.value.length + 1),
//     excerpt: 'This is an archived transmission from the past...',
//     date: 'DEC 2025',
//     type: 'update'
//   })
// }
</script>

<style scoped></style>
