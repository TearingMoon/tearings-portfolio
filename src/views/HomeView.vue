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
      <div class="text-white flex flex-col justify-center items-center" ref="proyectsSection">
        <h2 class="text-6xl font-bold my-10 relative">
          Proyects <span class="bg-emerald-400 absolute w-full h-5 right-0 -bottom-2 -z-10"></span>
        </h2>

        <ProyectsListComponent> </ProyectsListComponent>
      </div>
    </sectionComponent>
    <sectionComponent v-scrollAnimation>
      <div class="px-10 text-white flex flex-col items-center justify-center" ref="contactSection">
        <h1
          class="text-3xl sm:text-8xl my-10 font-bold bg-gradient-to-r from-sky-500 to-emerald-400 inline-block text-transparent bg-clip-text"
        >
          Wanna hire me?
        </h1>
        <div class="flex flex-row gap-10">
          <a href="https://www.linkedin.com/in/david-torrubia-santos-341628236/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="w-10 h-10 sm:w-20 sm:h-20 text-white/50 hover:text-white transition duration-150"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
              />
            </svg>
          </a>
          <a href="mailto:davidtorrubiasantos@gmail.com?Subject=I%20wanna%20Hire%20You!!!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="w-10 h-10 sm:w-20 sm:h-20 text-white/50 hover:text-white transition duration-150"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671"
              />
              <path
                d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"
              />
            </svg>
          </a>
          <a href="https://github.com/TearingMoon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="w-10 h-10 sm:w-20 sm:h-20 text-white/50 hover:text-white transition duration-150"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
              />
            </svg>
          </a>
        </div>
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
