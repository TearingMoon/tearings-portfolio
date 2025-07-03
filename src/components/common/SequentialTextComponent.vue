<template>
  <pre :class="['whitespace-pre-wrap break-words', props.class]">
    {{ displayedText }}<span v-if="props.showCursor" class="animate-pulse">|</span>
  </pre>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: string
    typeSpeed?: number
    showCursor?: boolean
  }>(),
  {
    typeSpeed: 20,
    showCursor: true
  }
)

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const displayedText = ref('')
const fullText = ref('')
const slots = useSlots()

onMounted(() => {
  const defaultSlot = slots.default?.()
  if (defaultSlot) {
    fullText.value = defaultSlot
      .map((v) => {
        if (typeof v.children === 'string') return v.children
        return ''
      })
      .join('')
  }
})

defineExpose({
  start: () => {
    displayedText.value = ''
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.value.length) {
        displayedText.value += fullText.value[index++]
      } else {
        clearInterval(interval)
        emit('finished')
      }
    }, props.typeSpeed)
  }
})
</script>
