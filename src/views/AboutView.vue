<template>
  <article
    class="flex min-h-full flex-col justify-center px-5 py-8 md:px-8"
  >
    <h1
      class="sm:mt-3 text-xl sm:text-4xl font-medium text-white font-terminal"
    >
      {{ $t("about.title") }}
    </h1>
    <hr class="sm:my-4 h-0.5 w-full bg-white/50" />
    <p class="max-w-xl text-white/70 text-xs sm:text-base">
      {{ $t("about.description") }}
    </p>
  </article>
</template>
