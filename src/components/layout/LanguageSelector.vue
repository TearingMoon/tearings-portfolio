<template>
  <div
    class="flex flex-row gap-2 font-terminal text-xs sm:text-xl text-white/50"
  >
    <button
      class="hover:text-white focus:outline-none cursor-pointer transition-all duration-200"
      :class="{ 'text-white': locale === 'en' }"
      @click="locale = 'en'"
    >
      en
    </button>
    <span class="text-white/50 pointer-events-none">|</span>
    <button
      class="hover:text-white focus:outline-none cursor-pointer"
      @click="locale = 'es'"
      :class="{ 'text-white': locale === 'es' }"
    >
      es
    </button>
  </div>
</template>

<script setup lang="ts">
//get the current language from vue-i18n
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
</script>

<style scoped></style>
