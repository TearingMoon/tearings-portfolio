<template>
  <div>
    <span>{{ displayedText }}</span>
    <span class="animate-blink">|</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TypingEffect',
  setup() {
    return {}
  },
  data() {
    return {
      displayedText: '',
      currentIndex: 0,
      typingSpeed: 100,
      showCursor: true
    }
  },
  mounted() {
    this.startTyping()
  },

  props: {
    text: {
      type: String,
      required: true
    }
  },

  methods: {
    startTyping() {
      const typingInterval = setInterval(() => {
        if (this.currentIndex < this.text.length) {
          this.displayedText += this.text[this.currentIndex]
          this.currentIndex++
        } else {
          clearInterval(typingInterval)
        }
      }, this.typingSpeed)
    }
  }
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
