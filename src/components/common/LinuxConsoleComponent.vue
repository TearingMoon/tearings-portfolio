<template>
  <div
    class="w-full relative border-2 border-neutral-800 flex flex-col rounded-2xl box-content shadow-md h-full shadow-black overflow-hidden bg-black text-white"
    @click="ConsoleClicked"
  >
    <!-- Hidden input -->
    <input
      type="text"
      class="absolute -top-10 left-0 w-0 h-0 opacity-0"
      v-model="hiddenInputText"
      @keydown="handleKeydown"
      ref="hiddenInput"
    />
    <!-- Header Container -->
    <div class="w-full h-10 bg-neutral-700 shadow flex flex-row items-center px-5">
      <h1 class="text-neutral-400 md:text-lg">/usr/local/bin/{{ currentProgram }}</h1>
      <!-- Remove this button -->
      <svg width="40" height="10" xmlns="http://www.w3.org/2000/svg" class="ml-auto">
        <circle cx="5" cy="5" r="5" fill="yellow" />
        <circle cx="20" cy="5" r="5" fill="green" />
        <circle cx="35" cy="5" r="5" fill="red" />
      </svg>
    </div>
    <!-- Console Container -->
    <div class="w-full h-full flex overflow-y-auto flex-col customScrolbar">
      <div class="px-5 pt-5 text-left" ref="consoleContainer"></div>
      <div class="px-5 pb-5">
        <span class="text-green-400 w-full"> guest@localhost:~$ </span> {{ hiddenInputText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"> //TODO: Modiffy this component to fully use the screen
import { ref, onMounted, useTemplateRef } from 'vue'

enum commandType {
  EXECUTABLE = 'executable',
  COMMAND = 'command'
}

class command {
  name: string
  description: string
  type: commandType
  execute: () => void
  constructor(
    name: string,
    description: string,
    execute: () => void,
    type: commandType = commandType.COMMAND
  ) {
    this.name = name
    this.description = description
    this.execute = execute
    this.type = type
  }
}

const currentProgram = ref('')

const hiddenInput = useTemplateRef('hiddenInput')
const consoleContainer = useTemplateRef('consoleContainer')
const hiddenInputText = ref('')

const commands = [
  new command(
    'startingMsg.sh',
    'Shows starting message',
    () => startingMessageCommand(),
    commandType.EXECUTABLE
  ),
  new command('about.sh', 'Shows about me', () => aboutCommand(), commandType.EXECUTABLE),
  new command(
    'contact.sh',
    'Shows contact me',
    () => workInProgressCommand(),
    commandType.EXECUTABLE
  ),
  new command(
    'projects.sh',
    'Shows projects',
    () => workInProgressCommand(),
    commandType.EXECUTABLE
  ),
  new command('help', 'Shows available commands', () => helpCommand()),
  new command('clear', 'Clears console', () => clearCommand()),
  new command('ls', 'List directory contents and executables', () => lsCommand())
]

onMounted(() => {
  hiddenInputText.value = 'startingMsg.sh'
  executeCommand()
})

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    executeCommand()
  }
}

function executeCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += `<span class="text-green-400 w-full"> guest@localhost:~$ </span> ${hiddenInputText.value}  <br>`

    for (const command of commands) {
      if (hiddenInputText.value === command.name) {
        currentProgram.value = command.name
        command.execute()
        break
      }
    }
  }
  hiddenInputText.value = ''
}

function ConsoleClicked() {
  if (hiddenInput.value) {
    hiddenInput?.value.focus({ preventScroll: true })
  }
}

function helpCommand() {
  if (consoleContainer.value) {
    for (const command of commands) {
      if (command.type !== commandType.EXECUTABLE)
        consoleContainer.value.innerHTML += `${command.name} <span class="text-neutral-500">- ${command.description} </span> <br>`
    }
  }
}

function lsCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += '<span class="font-bold"> /usr/local/bin/ <span> <br>'
    for (const command of commands) {
      if (command.type === commandType.EXECUTABLE)
        consoleContainer.value.innerHTML += `${command.name} <span class="text-neutral-500">- ${command.description} </span> <br>`
    }
  }
}

function clearCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML = ''
  }
}

function startingMessageCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += `<span class="text-xl font-bold">Welcome to my linux console! ;) </span><br>`
    consoleContainer.value.innerHTML += `Try to type '<span class="text-yellow-500">help</span>' to see avaliable commands <br>`
    consoleContainer.value.innerHTML += `Or type '<span class="text-purple-500">about.sh</span>' to open my aboutMe <br>`
  }
}

function aboutCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += `<span class="text-xl font-bold">About me </span><br>`
    consoleContainer.value.innerHTML += `I'm a software engineer, Videogame developer and full stack developer passionate about technology and I love to learn new things and share my knowledge with others. I'm always looking for new challenges and opportunities to grow as a professional in this awesome world of technology. <br>`
    consoleContainer.value.innerHTML += ` <br>`
  }
}

function workInProgressCommand() {
  if (consoleContainer.value) {
    consoleContainer.value.innerHTML += `<span class="text-xl font-bold">Work in progress </span><br>`
    consoleContainer.value.innerHTML += `This command is still in development, please try again later. <br>`
    consoleContainer.value.innerHTML += ` <br>`
  }
}
</script>

<style scoped>
/* width */
.customScrolbar::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.customScrolbar::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
.customScrolbar::-webkit-scrollbar-thumb {
  background: var(--color-neutral-800);
}

/* Handle on hover */
.customScrolbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-700);
}
</style>
