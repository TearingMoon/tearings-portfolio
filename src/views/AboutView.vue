<template>
  <main>
    <SectionComponent @section-mounted="handleSectionMounted">
      <div class="p-2 h-full">
        <div class="flex flex-col h-3/4 overflow-y-auto gap-1.5">
          <ChatMsgComponent
            v-for="msg in messageList"
            :key="msg.message"
            :sender="msg.sender"
            :message="msg.message"
          />
          <TextingDotsComponent v-if="isTyping" />
        </div>

        <div class="h-1/4 flex flex-col gap-2 overflow-y-auto p-2">
          <button
            v-for="answer in AnswerList"
            :key="answer.optionText"
            class="border-2 border-green-500 p-2 h-full hover:bg-green-500 hover:text-black transition-colors duration-300"
            @click="SelectAnswer(answer)"
          >
            {{ answer.optionText }}
          </button>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'
import ChatMsgComponent from '@/components/views/aboutView/ChatMsgComponent.vue'
import TextingDotsComponent from '@/components/views/aboutView/TextingDotsComponent.vue'

class Message {
  sender: string
  message: string

  constructor(sender: string, message: string) {
    this.sender = sender
    this.message = message
  }
}

class Option {
  optionText: string
  function: () => Promise<void>

  constructor(optionText: string, func: () => Promise<void> = async () => {}) {
    this.optionText = optionText
    this.function = func
  }
}

const AnswerList = ref<Option[]>([])
const messageList = ref<Message[]>([])

const CurrentOption = ref<Option | null>(null)

const isTyping = ref(false)

async function handleSectionMounted() {
  await Delay(1000)
  messageList.value.push(new Message('SYS', 'Establishing secure connection...'))
  await Delay(1000)
  messageList.value.push(
    new Message('SYS', 'Connection established. Welcome to the About Section.')
  )
  messageList.value.push(new Message('SYS', 'David connected to the secure server.'))
  await Delay(1000)
  isTyping.value = true
  await SendMessage('David', 'Hi there!')
  await SendMessage('David', 'Here you can find anything about me.')

  let loop = true
  while (loop) {
    await SendMessage('David', 'What do you want to know?')
    await PromptUserOptions([
      new Option('Tell me about your skills.', SkillsAnswer),
      new Option('Tell me about yourself.', AboutMeAnswer),
      new Option('What projects have you worked on?'),
      new Option('How can I contact you?')
    ])
  }
}

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

async function SendMessage(sender: string, message: string, delayPerWord: number = 300) {
  if (sender == 'David') {
    isTyping.value = true
  }
  await Delay(CalculateDelay(message, delayPerWord))
  messageList.value.push(new Message(sender, message))
}

function CalculateDelay(message: string, delayPerWord: number = 300): number {
  const words = message.split(' ').length
  return words * delayPerWord
}

async function PromptUserOptions(options: Option[]) {
  CurrentOption.value = null
  isTyping.value = false
  AnswerList.value.push(...options)

  await new Promise<void>((resolve) => {
    const checkAnswer = setInterval(() => {
      if (CurrentOption.value !== null) {
        clearInterval(checkAnswer)
        AnswerList.value = []
        resolve()
      }
    }, 500)
  }).then(async () => {
    await CurrentOption.value?.function()
    CurrentOption.value = null
  })
}

function SelectAnswer(option: Option) {
  CurrentOption.value = option
  messageList.value.push(new Message('You', option.optionText))
}

//#region Answers
async function SkillsAnswer() {
  await SendMessage(
    'David',
    'I have skills in web development, particularly with Vue.js and TypeScript.'
  )
  await SendMessage(
    'David',
    'I also have experience in backend development using Node.js and databases like MongoDB.'
  )
}

async function AboutMeAnswer() {
  for (let i = 0; i < 3; i++) {
    await SendMessage(
      'David',
      'I am a passionate developer with a love for creating interactive web applications.'
    )
  }
}

//#endregion Answers
</script>

<style scoped></style>
