<template>
  <main class="w-full h-full crt-screen crt-glass flicker text-green-500">
    <div class="fixed h-screen w-screen scanlines"></div>
    <slot class=""></slot>
  </main>
</template>

<script setup lang="ts"></script>

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
  position: absolute;
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
  z-index: 1000;
}

.flicker {
  animation: flicker 0.15s infinite alternate;
}

.crt-screen {
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0px 0px 20px rgba(0, 255, 0, 0.3);
}

.crt-glass {
  backdrop-filter: contrast(1.2) brightness(0.9) saturate(1.3);
}
</style>
