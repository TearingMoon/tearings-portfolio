<script setup lang="ts">
import ContactLink from "@/components/contact/Contactlink.vue";
import { Mail } from "lucide-vue-next";
import { siGithub, siLinkerd } from "simple-icons";
</script>

<template>
  <article class="flex min-h-full flex-col justify-center px-5 py-8 md:px-8">
    <h1 class="mt-3 text-4xl font-medium text-white font-terminal">
      Contact me!
    </h1>
    <hr class="my-4 h-0.5 w-full bg-white/50" />
    <p class="max-w-xl text-white/70">
      You can always find me working in new projects, be free to contact me
      about anything you want. I am always open to new opportunities and
      collaborations.
    </p>
    <div class="flex flex-col gap-2 mt-4">
      <ContactLink
        label="Email"
        value="contact@example.com"
        href="mailto:contact@example.com"
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
        value="TearingMoon"
        href="https://www.linkedin.com/in/david-torrubia-santos-341628236/"
      >
        <template #icon>
          <svg viewBox="0 0 24 24" class="size-5 fill-current">
            <path :d="siLinkerd.path" />
          </svg>
        </template>
      </ContactLink>
    </div>
  </article>
</template>
