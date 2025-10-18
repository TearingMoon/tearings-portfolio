<template>
  <div>
    <p class="w-full" :class="StyleBySender(props.sender)">
      &lt;{{ props.sender }}&gt;: {{ props.message }}
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
