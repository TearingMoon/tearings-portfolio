<template>
  <div :class="['crt-overlay ', props.class]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>

<style>
@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  33% {
    opacity: 0.95;
  }
  66% {
    opacity: 0.92;
  }
}

.crt-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 255, 0, 0.05);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  backdrop-filter: contrast(1.2) brightness(0.9) saturate(1.3);
  animation: flicker 0.2s infinite alternate;
  pointer-events: none;
}

.crt-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 2px,
    transparent 2px,
    transparent 4px
  );
  pointer-events: none;
  z-index: 10;
}
</style>
