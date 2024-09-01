import type { DirectiveBinding } from 'vue'

const animatedScrollObserver = new IntersectionObserver((entries, animatedScrollObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scrollAnimation_enter')
      animatedScrollObserver.unobserve(entry.target)
    }
  })
})

const scrollAnimation = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.classList.add('scrollAnimation_before-enter')
    animatedScrollObserver.observe(el)
  }
}

export default scrollAnimation
