<script setup lang="ts">
import ContactLink from "@/components/contact/Contactlink.vue";
import { Mail } from "@lucide/vue";
import { siGithub } from "simple-icons";
</script>

<template>
  <article
    class="flex min-h-full flex-col justify-center px-5 py-8 md:px-8 overflow-scroll"
  >
    <h1 class="mt-3 text-xl sm:text-4xl font-medium text-white font-terminal">
      {{ $t("contact.title") }}
    </h1>
    <hr class="sm:my-4 h-0.5 w-full bg-white/50" />
    <p class="max-w-xl text-white/70 text-xs sm:text-base">
      {{ $t("contact.description") }}
    </p>
    <div class="flex flex-row sm:flex-col gap-2 mt-4">
      <ContactLink
        label="Email"
        value="davidtorrubiadev@gmail.com"
        href="mailto:davidtorrubiadev@gmail.com"
        :external="false"
      >
        <template #icon>
          <Mail :size="20" :stroke-width="1.5" />
        </template>
      </ContactLink>
      <ContactLink
        label="GitHub"
        value="TearingMoon"
        href="https://github.com/TearingMoon"
      >
        <template #icon>
          <svg viewBox="0 0 24 24" class="size-5 fill-current">
            <path :d="siGithub.path" />
          </svg>
        </template>
      </ContactLink>
      <ContactLink
        label="LinkedIn"
        value="David Torrubia"
        href="https://www.linkedin.com/in/david-torrubia-santos-341628236/"
      >
        <template #icon>
          <svg
            viewBox="0 0 24 24"
            class="size-5 fill-current"
            aria-hidden="true"
          >
            <path
              d="M5.17 3.5A2.17 2.17 0 1 1 .83 3.5a2.17 2.17 0 0 1 4.34 0ZM1.2 7h3.94v12H1.2V7Zm6.39 0h3.78v1.64h.05c.53-1 1.81-2.06 3.73-2.06 3.99 0 4.73 2.63 4.73 6.05V19h-3.94v-5.64c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V19H7.59V7Z"
            />
          </svg>
        </template>
      </ContactLink>
    </div>
  </article>
</template>
