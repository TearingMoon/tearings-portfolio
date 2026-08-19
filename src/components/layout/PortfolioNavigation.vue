<script setup lang="ts">
import router from "@/router";
import { onUnmounted } from "vue";
import { useRoute } from "vue-router";

interface NavigationItem {
  label: string;
  routeName: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    routeName: "home",
  },
  {
    label: "About",
    routeName: "about",
  },
  {
    label: "Projects",
    routeName: "projects",
  },
  {
    label: "Contact",
    routeName: "contact",
  },
];

//Hahdle navigatin with arrow keys
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    navigateToPrevious();
  } else if (event.key === "ArrowRight") {
    navigateToNext();
  }
};

const route = useRoute();

const navigateToPrevious = () => {
  const currentIndex = navigationItems.findIndex(
    (item) => item.routeName === route.name,
  );
  const previousIndex =
    (currentIndex - 1 + navigationItems.length) % navigationItems.length;
  const previousRouteName = navigationItems[previousIndex].routeName;
  router.push({ name: previousRouteName });
};

const navigateToNext = () => {
  const currentIndex = navigationItems.findIndex(
    (item) => item.routeName === route.name,
  );
  const nextIndex = (currentIndex + 1) % navigationItems.length;
  const nextRouteName = navigationItems[nextIndex].routeName;
  router.push({ name: nextRouteName });
};

addEventListener("keydown", handleKeydown);
onUnmounted(() => {
  removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <nav
    class="fixed flex flex-col items-center justify-center gap-1 p-4"
    aria-label="Main navigation"
  >
    <div class="flex flex-wrap items-center justify-center gap-4">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.routeName"
        :to="{ name: item.routeName }"
        custom
        v-slot="{ href, navigate, isExactActive }"
      >
        <a
          :href="href"
          class="text-xs tracking-[0.15em] sm:text-xl duration-200 hover:text-white font-terminal hover:transform hover:scale-110 transition-all"
          :class="isExactActive ? 'text-white scale-110' : 'text-white/45'"
          :aria-current="isExactActive ? 'page' : undefined"
          @click="navigate"
        >
          {{ item.label }}
        </a>
      </RouterLink>
    </div>
    <hr class="w-full h-0.5 sm:w-1/2 sm:h-1 bg-white" />
  </nav>
</template>
