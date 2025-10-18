<template>
  <div>
    <p class="w-full" :class="StyleBySender(props.sender)">
      &lt;{{ props.sender }}&gt;: {{ props.message }}

      <a v-if="props.url" :href="props.url" target="_blank" class="text-blue-500 underline">Link</a>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sender: {
    type: String,
    default: 'David'
  },
  message: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  }
})

function StyleBySender(sender: string) {
  if (sender == 'You') {
    return 'bg-green-500 text-black font-bold'
  }
  if (sender == 'SYS') {
    return 'opacity-50 italic'
  }
  return ''
}
</script>

<style scoped></style>
