<template>
  <main>
    <HeaderComponent @scroll-to-section="scrollToElement($event)" />
    <ScrollUpButton />
    <sectionComponent class="bg-gradient-to-b from-gray-800 to-neutral-900">
      <div class="w-full h-screen py-10 flex flex-col" ref="homeSection">
        <div class="flex flex-col justify-center items-center w-full text-white grow">
          <h1 class="font-bold text-5xl md:text-8xl mb-10 text-center">
            <typingEffect text="DAVID TORRUBIA" />
          </h1>
          <h3 class="text-xl wordSpacing text-center animate__animated animate__flipInX">
            COMPUTER ENGINEERING & SOFTWARE DEVELOPER.
          </h3>
        </div>
        <div class="flex justify-center items-center w-full flex-none">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="svg5130"
            preserveAspectRatio="xMidYMid"
            class="text-white animate__animated animate__flipInX"
          >
            <defs id="defs6288"></defs>
            <path
              d=" M 5 15 C 5 16.8565 5.73754 18.6371 7.05029 19.9498 C 8.36305 21.2626 10.1435 21.9999 12 21.9999 C 13.8565 21.9999 15.637 21.2626 16.9498 19.9498 C 18.2625 18.6371 19 16.8565 19 15 V 9 C 19 7.14348 18.2625 5.36305 16.9498 4.05029 C 15.637 2.73754 13.8565 2 12 2 C 10.1435 2 8.36305 2.73754 7.05029 4.05029 C 5.73754 5.36305 5 7.14348 5 9 V 15 Z "
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="path3513"
            ></path>
            <path
              d="M 12 6 L 12 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="path8126"
            >
              <animateTransform
                attributeName="transform"
                attributeType="auto"
                type="translate"
                values="0 0;0 5;0 0"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0 0 1 1;0 0 1 1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
                additive="sum"
                accumulate="none"
                fill="freeze"
                id="animateTransform1743"
              ></animateTransform>
            </path>
            <path
              d="M 15 11 L 12 14 L 9 11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="path4934"
            >
              <animateTransform
                attributeName="transform"
                attributeType="auto"
                type="translate"
                values="0 0;0 5;0 0"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0 0 1 1;0 0 1 1"
                dur="1s"
                begin="0s"
                repeatCount="indefinite"
                additive="sum"
                accumulate="none"
                fill="freeze"
                id="animateTransform7630"
              ></animateTransform>
            </path>
          </svg>
        </div>
      </div>
    </sectionComponent>
    <sectionComponent v-scrollAnimation>
      <div class="mb-10 text-white flex flex-col justify-center items-center" ref="stackSection">
        <h2 class="text-6xl font-bold my-10 relative">
          My stack <span class="bg-emerald-400 absolute w-full h-5 right-0 -bottom-2 -z-10"></span>
        </h2>
        <div class="flex flex-col md:flex-row flex-wrap gap-10">
          <StackListItemComponent>
            <template #content
              ><div class="videoContainerAdjust">
                <video
                  src="/videos/frontEndVideo.mp4"
                  autoplay
                  muted
                  loop
                  class="videoDecoration"
                ></video>
              </div>
            </template>
            <template #title> $ FRONT END </template>
            <template #description>
              Over 2 years of experience in frameworks like
              <a href="https://vuejs.org/" class="text-green-600">Vue.js</a>,
              <a href="https://angular.dev/" class="text-red-500">Angular</a> and
              <a href="https://react.dev/" class="text-blue-500">React</a>. Also, I have experience
              with CSS frameworks like
              <a href="https://tailwindcss.com/" class="text-cyan-500">TailwindCSS</a> and
              <a href="https://getbootstrap.com/" class="text-purple-500">Bootstrap</a>.
            </template>
          </StackListItemComponent>
          <StackListItemComponent>
            <template #content
              ><div class="videoContainerAdjust">
                <video
                  src="/videos/movileDevVideo.mp4"
                  autoplay
                  muted
                  loop
                  class="videoDecoration"
                ></video></div
            ></template>
            <template #title> $ IOS, ANDROID </template>
            <template #description>
              Developed multiple apps for Ios and android for personal and profesional use using
              <a href="https://ionicframework.com/" class="text-cyan-500">Ionic</a> framework.
            </template>
          </StackListItemComponent>
          <StackListItemComponent>
            <template #content>
              <div class="videoContainerAdjust">
                <video
                  src="/videos/backEndVideo.mp4"
                  autoplay
                  muted
                  loop
                  class="videoDecoration"
                ></video>
              </div>
            </template>
            <template #title> $ BACK END </template>
            <template #description>
              Experience with <a href="https://nodejs.org" class="text-green-500">Node.js</a> ,
              <a href="https://expressjs.com" class="text-blue-500">Express.js</a> and
              <a href="https://dotnet.microsoft.com" class="text-purple-500">.NET</a>. Also, I have
              experience with databases like MongoDB, MySQL and PostgreSQL.
            </template>
          </StackListItemComponent>
          <StackListItemComponent>
            <template #content>
              <div class="videoContainerAdjust">
                <video
                  src="/videos/desktopVideo.mp4"
                  autoplay
                  muted
                  loop
                  class="videoDecoration"
                ></video>
              </div>
            </template>
            <template #title> $ DESKTOP </template>
            <template #description>
              Developed desktop applications using
              <a href="https://electronjs.org/" class="text-yellow-500">Electron</a> framework.
            </template>
          </StackListItemComponent>
        </div>
      </div>
    </sectionComponent>
    <sectionComponent v-scrollAnimation>
      <div class="mb-10 text-white flex flex-col justify-center items-center" ref="proyectsSection">
        <h2 class="text-6xl font-bold my-10 relative">
          Proyects <span class="bg-emerald-400 absolute w-full h-5 right-0 -bottom-2 -z-10"></span>
        </h2>
        <ProyectsListComponent> </ProyectsListComponent>
      </div>
    </sectionComponent>
    <sectionComponent v-scrollAnimation>
      <div class="mb-10 text-white flex flex-col justify-center items-center" ref="contactSection">
        <h2 class="text-6xl font-bold my-10 relative">
          Contact <span class="bg-emerald-400 absolute w-full h-5 right-0 -bottom-2 -z-10"></span>
        </h2>
      </div>
    </sectionComponent>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sectionComponent from '@/components/utils/SectionComponent.vue'
import typingEffect from '@/components/utils/TypingEffect.vue'
import ScrollUpButton from '@/components/common/ScrollUpButton.vue'
import StackListItemComponent from '@/components/views/home/StackListItemComponent.vue'
import HeaderComponent from '@/components/common/HeaderComponent.vue'
import ProyectsListComponent from '@/components/views/home/ProyectsListComponent.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: {
    sectionComponent,
    typingEffect,
    ScrollUpButton,
    StackListItemComponent,
    HeaderComponent,
    ProyectsListComponent
  },
  methods: {
    scrollToElement(refName: string) {
      const element = this.$refs[refName] as HTMLElement
      console.log(element)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.error(`No se encontró el elemento con el ref: ${refName}`)
      }
    }
  }
})
</script>

<style scoped>
.wordSpacing {
  word-spacing: 0.5em;
}
.wordSpacingSm {
  word-spacing: 0.2em;
}
.videoDecoration {
  box-shadow: 10px 10px rgba(0, 0, 0, 0.5);
  border: 5px solid black;
}
.videoContainerAdjust {
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
