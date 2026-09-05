<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

interface NavigationItem {
  labelKey: string;
  routeName: string;
}

const { t } = useI18n({
  useScope: "global",
});

const route = useRoute();
const router = useRouter();

const navigationItems: NavigationItem[] = [
  {
    labelKey: "views.home",
    routeName: "home",
  },
  {
    labelKey: "views.about",
    routeName: "about",
  },
  {
    labelKey: "views.projects",
    routeName: "projects",
  },
  {
    labelKey: "views.contact",
    routeName: "contact",
  },
];

function navigateToPrevious(): void {
  const currentIndex = navigationItems.findIndex(
    (item) => item.routeName === route.name,
  );

  const previousIndex =
    (currentIndex - 1 + navigationItems.length) %
    navigationItems.length;

  router.push({
    name: navigationItems[previousIndex].routeName,
  });
}

function navigateToNext(): void {
  const currentIndex = navigationItems.findIndex(
    (item) => item.routeName === route.name,
  );

  const nextIndex =
    (currentIndex + 1) % navigationItems.length;

  router.push({
    name: navigationItems[nextIndex].routeName,
  });
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "ArrowLeft") {
    navigateToPrevious();
  } else if (event.key === "ArrowRight") {
    navigateToNext();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <nav
    class="fixed flex flex-col items-center justify-center gap-1 p-4"
    aria-label="Main navigation"
  >
    <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <a
          :href="href"
          class="
            font-terminal
            text-xs
            tracking-[0.15em]
            transition-all
            duration-200
            hover:scale-110
            hover:text-white
            sm:text-xl
          "
          :class="
            isExactActive
              ? 'scale-110 text-white'
              : 'text-white/45'
          "
          :aria-current="
            isExactActive ? 'page' : undefined
          "
          @click="navigate"
        >
          {{ t(item.labelKey) }}
        </a>
      </RouterLink>
    </div>

    <hr class="h-0.5 w-full bg-white sm:h-1 sm:w-1/2" />
  </nav>
</template>