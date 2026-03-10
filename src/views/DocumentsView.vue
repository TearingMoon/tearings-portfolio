<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <ViewHeader
          title="ARCHIVE ACCESS // DOCUMENTS"
          subtitle="Official documents and downloadable resources"
        />

        <!-- Security Notice -->
        <div class="border border-green-500 bg-green-500/5 p-4 flex items-center gap-4">
          <span class="text-lg font-mono text-green-500">[SECURE]</span>
          <div>
            <p class="font-bold">SECURE DOCUMENT VAULT</p>
            <p class="text-sm opacity-70">All documents are verified and virus-scanned</p>
          </div>
        </div>

        <FilterTabs v-model="activeCategory" :tabs="categories" />

        <!-- Documents List -->
        <div class="space-y-4">
          <article
            v-for="doc in filteredDocuments"
            :key="doc.id"
            class="border border-green-500 p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-green-500/5 transition-colors group"
          >
            <div class="text-4xl flex-shrink-0">{{ doc.icon }}</div>

            <div class="flex-grow">
              <h3 class="font-bold text-lg group-hover:text-green-400 transition-colors">
                {{ doc.name }}
              </h3>
              <p class="text-sm opacity-70">{{ doc.description }}</p>
              <div class="flex flex-wrap gap-3 mt-2 text-xs">
                <span class="text-green-400">{{ doc.format }}</span>
                <span class="opacity-50">{{ doc.size }}</span>
                <span class="opacity-50">Updated: {{ doc.lastUpdated }}</span>
              </div>
            </div>

            <div class="flex gap-2 flex-shrink-0">
              <button
                @click="previewDocument(doc)"
                class="border border-green-500 px-4 py-2 text-sm hover:bg-green-500 hover:text-black transition-colors cursor-pointer"
                :aria-label="`Preview ${doc.name}`"
              >
                [PREVIEW]
              </button>
              <a
                :href="doc.downloadUrl"
                :download="doc.filename"
                class="border border-green-500 px-4 py-2 text-sm hover:bg-green-500 hover:text-black transition-colors"
                :aria-label="`Download ${doc.name}`"
              >
                [DOWNLOAD]
              </a>
            </div>
          </article>
        </div>

        <EmptyState
          v-if="filteredDocuments.length === 0"
          title="NO DOCUMENTS FOUND"
          message="No documents match the selected category."
        />

        <!-- Quick Links -->
        <ContentSection title="QUICK LINKS" class="mt-auto">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <a href="#" class="border border-green-500/50 p-3 text-center hover:border-green-500 hover:bg-green-500/10 transition-colors">
              LinkedIn Profile
            </a>
            <a href="https://github.com/TearingMoon" target="_blank" rel="noopener noreferrer" class="border border-green-500/50 p-3 text-center hover:border-green-500 hover:bg-green-500/10 transition-colors">
              GitHub Profile
            </a>
            <a href="#" class="border border-green-500/50 p-3 text-center hover:border-green-500 hover:bg-green-500/10 transition-colors">
              Portfolio Source
            </a>
          </div>
        </ContentSection>
      </div>
    </SectionComponent>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'
import ViewHeader from '@/components/common/ViewHeader.vue'
import FilterTabs from '@/components/common/FilterTabs.vue'
import ContentSection from '@/components/common/ContentSection.vue'
import EmptyState from '@/components/common/EmptyState.vue'

interface Document {
  id: number
  name: string
  description: string
  category: string
  format: string
  size: string
  lastUpdated: string
  icon: string
  filename: string
  downloadUrl: string
}

const activeCategory = ref('All')
const categories = ['All', 'Resume', 'Certificates', 'References']

const documents: Document[] = [
  // { id: 1, name: 'Curriculum Vitae - EN', description: 'Complete professional resume in English', category: 'Resume', format: 'PDF', size: '245 KB', lastUpdated: 'Mar 2026', icon: '[DOC]', filename: 'david_torrubia_cv_en.pdf', downloadUrl: '#' },
  // { id: 2, name: 'Curriculum Vitae - ES', description: 'Currículum profesional completo en español', category: 'Resume', format: 'PDF', size: '248 KB', lastUpdated: 'Mar 2026', icon: '[DOC]', filename: 'david_torrubia_cv_es.pdf', downloadUrl: '#' },
  // { id: 3, name: 'AWS Solutions Architect Certificate', description: 'Amazon Web Services certification credential', category: 'Certificates', format: 'PDF', size: '156 KB', lastUpdated: '2023', icon: '[CERT]', filename: 'aws_certificate.pdf', downloadUrl: '#' },
  // { id: 4, name: 'Docker Certified Associate', description: 'Docker Inc. professional certification', category: 'Certificates', format: 'PDF', size: '142 KB', lastUpdated: '2022', icon: '[CERT]', filename: 'docker_certificate.pdf', downloadUrl: '#' },
  // { id: 5, name: 'Professional References', description: 'Contact information for professional references', category: 'References', format: 'PDF', size: '98 KB', lastUpdated: 'Feb 2026', icon: '[REF]', filename: 'references.pdf', downloadUrl: '#' }
]

const filteredDocuments = computed(() => {
  if (activeCategory.value === 'All') return documents
  return documents.filter(d => d.category === activeCategory.value)
})

function previewDocument(doc: Document) {
  alert(`Preview for "${doc.name}" would open here.\nThis is a placeholder for demonstration.`)
}
</script>

<style scoped></style>
