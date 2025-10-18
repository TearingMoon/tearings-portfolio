<template>
  <main>
    <SectionComponent @section-mounted="handleSectionMounted">
      <button class="absolute cursor-pointer w-fit top-0" v-if="messageList.length > 10" @click="ClearChat">
        Clear Chat
      </button>
      <div class="h-full">
        <div class="flex flex-col h-3/4 overflow-y-auto gap-1.5 p-2" ref="chatContainer">
          <ChatMsgComponent
            v-for="msg in messageList"
            :key="msg.message"
            :sender="msg.sender"
            :message="msg.message"
            :url="msg.url"
          />
          <TextingDotsComponent v-if="isTyping" />
        </div>

        <div class="h-1/4 flex flex-col gap-2 overflow-y-auto p-2">
          <div
            v-if="AnswerList.length === 0 || CurrentOption"
            class="italic text-center h-full w-full border-2 border-green-500 flex items-center justify-center"
          >
            No options available.
          </div>
          <button
            v-else
            v-for="answer in AnswerList"
            :key="answer.optionText"
            class="border-2 border-green-500 p-2 h-full hover:bg-green-500 hover:text-black transition-colors duration-300 cursor-pointer"
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
import { ref, useTemplateRef } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'
import ChatMsgComponent from '@/components/views/aboutView/ChatMsgComponent.vue'
import TextingDotsComponent from '@/components/views/aboutView/TextingDotsComponent.vue'

class Message {
  sender: string
  message: string
  url?: string

  constructor(sender: string, message: string, url?: string) {
    this.sender = sender
    this.message = message
    this.url = url
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

const chatContainer = useTemplateRef('chatContainer')

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
      new Option('What projects have you worked on?', ProjectsAnswer),
      new Option('How can I contact you?')
    ])
  }
}

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

async function SendMessage(sender: string, message: string, delayPerWord: number = 100) {
  if (sender == 'David' && !isTyping.value) {
    isTyping.value = true
  }
  await Delay(CalculateDelay(message, delayPerWord))
  messageList.value.push(new Message(sender, message))

  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

async function SendMessageObject(message: Message, delayPerWord: number = 100) {
  if (message.sender == 'David' && !isTyping.value) {
    isTyping.value = true
  }
  await Delay(CalculateDelay(message.message, delayPerWord))
  messageList.value.push(message)

  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
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
  SendMessageObject(new Message('You', option.optionText))
}

function ClearChat() {
  messageList.value = []
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
  for (let i = 0; i < 15; i++) {
    await SendMessage(
      'David',
      'I am a passionate developer with a love for creating interactive web applications.',
      50
    )
  }
}

async function ProjectsAnswer() {
  await SendMessage(
    'David',
    'I have worked on several projects, including a real-time chat application and a task management tool.'
  )
  await SendMessageObject(new Message('David', 'You can check out my portfolio here:', '/projects'))
}

//#endregion Answers
</script>

<style scoped></style>
