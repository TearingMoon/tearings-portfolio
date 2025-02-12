<template>
  <main class="flex flex-col mt-20">
    <TestingSectionComponent :title="'TypingEffect Component'" ref="TypingEffect">
      <TypingEffect
        class="text-white"
        text="This is a test of the typing effect component."
        :typing-speed="50"
      />
      <TypingEffect
        class="text-white font-bold"
        text="This is a test of the typing effect component."
        :typing-speed="100"
      />
      <TypingEffect
        class="text-white text-2xl"
        text="This is a test of the typing effect component."
        :typing-speed="150"
      />
    </TestingSectionComponent>
    <TestingSectionComponent> </TestingSectionComponent>
  </main>
</template>

<script setup lang="ts">
import TypingEffect from '@/components/utils/TypingEffect.vue'
import TestingSectionComponent from '@/components/views/testing/TestingSectionComponent.vue'
</script>
