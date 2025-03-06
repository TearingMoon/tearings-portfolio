<template>
  <main
    class="h-screen! w-screen! overflow-hidden! flex flex-col items-center justify-center crt-screen crt-glass crt-effect flicker"
  >
    <div class="scanlines h-screen w-screen"></div>
    <LoadingScreen />
  </main>
</template>

<script lang="ts" setup>
import LoadingScreen from '@/components/views/Home/LoadingScreen.vue'
</script>

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
  animation: flicker 0.15s infinite alternate;
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
