<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex flex-col items-center gap-2 p-3 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all group"
    :aria-label="label"
  >
    <svg
      :viewBox="icon.viewBox"
      class="w-10 h-10 fill-green-700 group-hover:fill-green-500 transition-colors"
    >
      <path
        :fill-rule="icon.fillRule"
        :clip-rule="icon.clipRule"
        :d="icon.path"
      />
    </svg>
    <span class="font-bold group-hover:text-green-400 transition-colors text-sm">{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
export interface SocialIcon {
  viewBox: string
  path: string
  fillRule?: string
  clipRule?: string
}

defineProps<{
  href: string
  label: string
  icon: SocialIcon
}>()
</script>
