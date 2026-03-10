<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-4">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-3">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">COMM-LINK // CONTACT</h1>
          <p class="text-sm sm:text-lg opacity-70">Establish a secure communication channel</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          <!-- Direct Contact -->
          <section class="border border-green-500 p-4">
            <h2 class="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span class="text-green-400">[</span> DIRECT CHANNELS
              <span class="text-green-400">]</span>
            </h2>

            <div class="space-y-3">
              <ContactInfoItem
                v-for="item in contactItems"
                :key="item.tag"
                :tag="item.tag"
                :title="item.title"
                :subtitle="item.subtitle"
                :href="item.href"
              />
            </div>
          </section>

          <!-- Social Links -->
          <section class="border border-green-500 p-4">
            <h2 class="text-xl sm:text-2xl font-bold mb-3 flex items-center gap-2">
              <span class="text-green-400">[</span> SOCIAL NETWORKS
              <span class="text-green-400">]</span>
            </h2>

            <div class="grid grid-cols-2 gap-3">
              <SocialLinkCard
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                :label="social.label"
                :icon="social.icon"
              />
            </div>
          </section>
        </div>

        <!-- Availability Notice -->
        <div class="border border-green-500/50 border-dashed p-3 text-center">
          <p class="text-sm opacity-70">
            [TIP] Check my
            <router-link to="/availability" class="text-green-400 hover:underline"
              >availability status</router-link
            >
            to see if I'm currently accepting new projects.
          </p>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import SectionComponent from '@/components/common/SectionComponent.vue'
import ContactInfoItem from '@/components/views/contactView/ContactInfoItem.vue'
import SocialLinkCard from '@/components/views/contactView/SocialLinkCard.vue'
import { socialIcons } from '@/components/views/contactView/socialIcons'

const contactItems = [
  {
    tag: 'MAIL',
    title: 'Email',
    subtitle: 'davidtorrubiadev@gmail.com',
    href: 'mailto:davidtorrubiadev@gmail.com'
  },
  {
    tag: 'LOC',
    title: 'Location',
    subtitle: 'Zaragoza, Spain (CET)'
  },
  {
    tag: 'TIME',
    title: 'Response Time',
    subtitle: 'Usually within 24-48 hours'
  }
]

const socialLinks = [
  { href: 'https://github.com/TearingMoon', label: 'GitHub', icon: socialIcons.github },
  { href: 'https://www.linkedin.com/in/david-torrubia-santos-341628236/', label: 'LinkedIn', icon: socialIcons.linkedin }
]
</script>

<style scoped></style>
