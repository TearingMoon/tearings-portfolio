<template>
  <main>
    <SectionComponent>
      <div class="p-5 h-full w-full flex flex-col gap-6">
        <!-- Header -->
        <div class="text-center border-b border-green-500 pb-4">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">COMM-LINK // CONTACT</h1>
          <p class="text-sm sm:text-lg opacity-70">Establish a secure communication channel</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Contact Form -->
          <section class="border border-green-500 p-4">
            <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
              <span class="text-green-400">[</span> SEND TRANSMISSION <span class="text-green-400">]</span>
            </h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="name" class="block text-sm mb-1 text-green-400">IDENTIFIER *</label>
                <input 
                  id="name"
                  v-model="form.name"
                  type="text" 
                  required
                  placeholder="Your name"
                  class="w-full px-4 py-2 bg-black border border-green-500 text-green-500 placeholder-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-400"
                />
              </div>

              <div>
                <label for="email" class="block text-sm mb-1 text-green-400">RETURN FREQUENCY *</label>
                <input 
                  id="email"
                  v-model="form.email"
                  type="email" 
                  required
                  placeholder="your@email.com"
                  class="w-full px-4 py-2 bg-black border border-green-500 text-green-500 placeholder-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-400"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm mb-1 text-green-400">SUBJECT</label>
                <select 
                  id="subject"
                  v-model="form.subject"
                  class="w-full px-4 py-2 bg-black border border-green-500 text-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="project">Project Proposal</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="job">Job Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm mb-1 text-green-400">MESSAGE *</label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Your message..."
                  class="w-full px-4 py-2 bg-black border border-green-500 text-green-500 placeholder-green-500/50 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full border-2 border-green-500 px-6 py-3 font-bold hover:bg-green-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {{ isSubmitting ? '[ TRANSMITTING... ]' : '[ SEND TRANSMISSION ]' }}
              </button>

              <!-- Status Message -->
              <div 
                v-if="statusMessage"
                :class="[
                  'p-3 border text-center text-sm',
                  statusType === 'success' ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-red-500 bg-red-500/10 text-red-400'
                ]"
              >
                {{ statusMessage }}
              </div>
            </form>
          </section>

          <!-- Contact Info & Social -->
          <div class="space-y-6">
            <!-- Direct Contact -->
            <section class="border border-green-500 p-4">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span class="text-green-400">[</span> DIRECT CHANNELS <span class="text-green-400">]</span>
              </h2>
              
              <div class="space-y-3">
                <a 
                  href="mailto:contact@example.com"
                  class="flex items-center gap-3 p-3 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-colors group"
                >
                  <span class="text-2xl">📧</span>
                  <div>
                    <div class="font-bold group-hover:text-green-400 transition-colors">Email</div>
                    <div class="text-sm opacity-70">contact@davidtorrubia.dev</div>
                  </div>
                </a>

                <div class="flex items-center gap-3 p-3 border border-green-500/50">
                  <span class="text-2xl">📍</span>
                  <div>
                    <div class="font-bold">Location</div>
                    <div class="text-sm opacity-70">Madrid, Spain (CET)</div>
                  </div>
                </div>

                <div class="flex items-center gap-3 p-3 border border-green-500/50">
                  <span class="text-2xl">⏱️</span>
                  <div>
                    <div class="font-bold">Response Time</div>
                    <div class="text-sm opacity-70">Usually within 24-48 hours</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Social Links -->
            <section class="border border-green-500 p-4">
              <h2 class="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span class="text-green-400">[</span> SOCIAL NETWORKS <span class="text-green-400">]</span>
              </h2>
              
              <div class="grid grid-cols-2 gap-3">
                <a 
                  href="https://www.linkedin.com/in/david-torrubia-santos-341628236/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-4 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                  aria-label="LinkedIn Profile"
                >
                  <svg viewBox="0 0 382 382" class="w-12 h-12 fill-green-700 group-hover:fill-green-500 transition-colors">
                    <path d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"/>
                  </svg>
                  <span class="font-bold group-hover:text-green-400 transition-colors">LinkedIn</span>
                </a>

                <a 
                  href="https://github.com/TearingMoon"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-4 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                  aria-label="GitHub Profile"
                >
                  <svg viewBox="0 0 98 96" class="w-12 h-12 fill-green-700 group-hover:fill-green-500 transition-colors">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                  </svg>
                  <span class="font-bold group-hover:text-green-400 transition-colors">GitHub</span>
                </a>

                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-4 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                  aria-label="Twitter/X Profile"
                >
                  <svg viewBox="0 0 24 24" class="w-12 h-12 fill-green-700 group-hover:fill-green-500 transition-colors">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span class="font-bold group-hover:text-green-400 transition-colors">X / Twitter</span>
                </a>

                <a 
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex flex-col items-center gap-2 p-4 border border-green-500/50 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                  aria-label="Discord Server"
                >
                  <svg viewBox="0 0 127.14 96.36" class="w-12 h-12 fill-green-700 group-hover:fill-green-500 transition-colors">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span class="font-bold group-hover:text-green-400 transition-colors">Discord</span>
                </a>
              </div>
            </section>

            <!-- Availability Notice -->
            <div class="border border-green-500/50 border-dashed p-4 text-center">
              <p class="text-sm opacity-70">
                💡 Before reaching out, check my 
                <router-link to="/availability" class="text-green-400 hover:underline">availability status</router-link>
                to see if I'm currently accepting new projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionComponent>
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import SectionComponent from '@/components/common/SectionComponent.vue'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: 'general',
  message: ''
})

const isSubmitting = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

async function handleSubmit(): Promise<void> {
  isSubmitting.value = true
  statusMessage.value = ''

  try {
    // Simulate API call - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In production, you would send to your backend or a service like Formspree
    console.log('Form submitted:', form)
    
    statusType.value = 'success'
    statusMessage.value = '✓ Transmission sent successfully! I will respond as soon as possible.'
    
    // Reset form
    form.name = ''
    form.email = ''
    form.subject = 'general'
    form.message = ''
  } catch (error) {
    statusType.value = 'error'
    statusMessage.value = '✗ Transmission failed. Please try again or use direct email.'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped></style>
