<script setup lang="ts">
import { RouterView } from 'vue-router'

console.log(
  'Hi! if you are reading this, you are awesome! 🚀, the full code of this webpage is in https://github.com/TearingMoon/tearings-portfolio '
)
</script>

<template>
  <div
    class="h-screen! w-screen! overflow-hidden! flex flex-col items-center justify-center crt-screen crt-glass flicker"
  >
    <div class="scanlines h-screen w-screen"></div>
    <RouterView />
  </div>
</template>

<style scoped>
@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 2px,
    transparent 2px,
    transparent 4px
  );
  pointer-events: none;
}

.flicker {
  /* animation: flicker 0.15s infinite alternate; */ /* Uncomment this line to enable flicker effect */
}

.crt-screen {
  position: relative;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0px 0px 20px rgba(0, 255, 0, 0.3);
}

.crt-glass {
  backdrop-filter: contrast(1.2) brightness(0.9) saturate(1.3);
}
</style>
