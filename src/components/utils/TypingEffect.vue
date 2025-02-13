<template>
  <div>
    <span>{{ displayedText }}</span>
    <span class="animate-blink">|</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

var displayedText = ref('')
var currentIndex = ref(0)

const emit = defineEmits(['doneTyping'])
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  typingSpeed: {
    type: Number,
    default: 100
  },
  autoStart: {
    type: Boolean,
    default: true
  }
})

function startTyping() {
  const typingInterval = setInterval(() => {
    if (currentIndex.value < props.text.length) {
      displayedText.value += props.text[currentIndex.value]
      currentIndex.value++
    } else {
      emit('doneTyping')
      clearInterval(typingInterval)
    }
  }, props.typingSpeed)
}

onMounted(() => {
  if (props.autoStart) {
    startTyping()
  }
})

defineExpose({
  startTyping
})
</script>

<style>
.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
