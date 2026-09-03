<!-- ContactLink.vue -->
<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

withDefaults(defineProps<Props>(), {
  external: true,
});
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    class="group flex items-center gap-4 rounded-lg border border-white/10 px-4 py-3 transition-all duration-200 hover:border-white/30 hover:bg-white/3"
  >
    <div
      class="flex size-6 shrink-0 items-center justify-center text-white/60 transition-colors group-hover:text-white"
    >
      <slot name="icon" />
    </div>

    <div class="min-w-0">
      <div class="font-terminal text-sm text-white">
        {{ label }}
      </div>

      <div class="truncate font-mono text-xs text-white/40">
        {{ value }}
      </div>
    </div>
  </a>
</template>
