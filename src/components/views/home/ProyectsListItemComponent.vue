<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      v-if="categories.includes(filterCategory)"
      @click="redirectTo"
      class="p-10 bg-gray-800 shadow-lg w-2/5 interactable"
    >
      <slot name="content"> </slot>
      <h2 class="font-bold text-2xl my-5 text-center"><slot name="title"></slot></h2>
      <p>
        <strong>Description:</strong>
        <slot name="description"></slot>
      </p>
      <p>
        <strong>Technologies:</strong>
        <slot name="technologies"></slot>
      </p>
      <div class="flex flex-row gap-4 flex-wrap mt-5">
        <div class="border-2 p-2" v-for="(category, index) in categories" :key="index">
          {{ category }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  data() {
    return {}
  },
  props: {
    categories: {
      type: Array,
      required: true
    },
    filterCategory: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: false
    }
  },
  methods: {
    redirectTo() {
      if (this.link) {
        window.open(this.link, '_blank')
      }
    }
  }
})
</script>

<style scoped></style>
