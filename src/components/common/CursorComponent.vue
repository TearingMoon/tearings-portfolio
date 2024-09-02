<template>
  <div class="hidden sm:block">
    <!-- Cursor personalizado -->
    <div
      class="custom-cursor"
      :style="{
        top: cursorY + 'px',
        left: cursorX + 'px'
      }"
      ref="cursor"
    ></div>
    <div
      class="custom-cursor-circle"
      :style="{
        top: cursorCircleY + 'px',
        left: cursorCircleX + 'px',
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
      }"
      ref="cursor_circle"
    ></div>
    <!-- Slot para insertar contenido dentro del componente -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      cursorX: 0, // Posición X del cursor
      cursorY: 0, // Posición Y del cursor
      cursorCircleX: 0, // Posición X del cursor círculo (con retraso)
      cursorCircleY: 0, // Posición Y del cursor círculo (con retraso)
      isHovering: false, // Estado para saber si está haciendo hover sobre un elemento interactivo
      followSpeed: 0.1, // Velocidad de seguimiento del cursor círculo
      animationFrameId: 0 // ID del requestAnimationFrame para cancelar en el unmount
    }
  },
  methods: {
    // Actualiza la posición del cursor
    updateCursorPosition(event: any) {
      this.cursorX = event.clientX
      this.cursorY = event.clientY
    },
    // Actualiza la posición del cursor círculo con un retraso
    updateCursorCirclePosition() {
      // Interpolación para suavizar el movimiento
      this.cursorCircleX += (this.cursorX - this.cursorCircleX) * this.followSpeed
      this.cursorCircleY += (this.cursorY - this.cursorCircleY) * this.followSpeed

      // Usa requestAnimationFrame para seguir actualizando la posición del círculo
      this.animationFrameId = requestAnimationFrame(this.updateCursorCirclePosition)
    },
    // Muestra el cursor cuando el mouse entra en la ventana
    showCursor() {
      ;(this.$refs.cursor as HTMLElement).style.opacity = '1'
      ;(this.$refs.cursor_circle as HTMLElement).style.opacity = '1'
    },
    // Oculta el cursor cuando el mouse sale de la ventana
    hideCursor() {
      ;(this.$refs.cursor as HTMLElement).style.opacity = '0'
      ;(this.$refs.cursor_circle as HTMLElement).style.opacity = '0'
    },
    // Cambia el estilo del cursor cuando hace hover sobre un elemento interactivo
    onMouseEnter() {
      this.isHovering = true
      ;(this.$refs.cursor as HTMLElement).style.opacity = '0.5'
      ;(this.$refs.cursor_circle as HTMLElement).style.opacity = '0.5'
    },
    // Restablece el estilo del cursor cuando deja de hacer hover
    onMouseLeave() {
      this.isHovering = false
      ;(this.$refs.cursor as HTMLElement).style.opacity = '1'
      ;(this.$refs.cursor_circle as HTMLElement).style.opacity = '1'
    },
    // Función para añadir eventos de hover a elementos interactivos
    addHoverListeners() {
      const interactableElements = document.querySelectorAll('a, button, .interactable')
      interactableElements.forEach((el) => {
        ;(el as HTMLElement).style.cursor = 'none' // Oculta el cursor predeterminado del navegador
        el.addEventListener('mouseenter', this.onMouseEnter)
        el.addEventListener('mouseleave', this.onMouseLeave)
      })
    },
    // Función para remover eventos de hover de elementos interactivos
    removeHoverListeners() {
      const interactableElements = document.querySelectorAll('a, button, .interactable')
      interactableElements.forEach((el) => {
        ;(el as HTMLElement).style.cursor = '' // Restaura el cursor predeterminado del navegador
        el.removeEventListener('mouseenter', this.onMouseEnter)
        el.removeEventListener('mouseleave', this.onMouseLeave)
      })
    },
    // Refresca los listeners cuando los elementos dinámicos se actualizan
    refreshHoverListeners() {
      this.removeHoverListeners()
      this.addHoverListeners()
    }
  },
  mounted() {
    // Escucha eventos del mouse para actualizar el cursor
    document.addEventListener('mousemove', this.updateCursorPosition)
    document.addEventListener('mouseenter', this.showCursor)
    document.addEventListener('mouseleave', this.hideCursor)

    // Añadir eventos de hover a los elementos interactivos
    this.addHoverListeners()

    // Inicia la actualización de la posición del cursor círculo
    this.updateCursorCirclePosition()
  },
  beforeUnmount() {
    // Limpia los listeners cuando el componente se desmonta
    document.removeEventListener('mousemove', this.updateCursorPosition)
    document.removeEventListener('mouseenter', this.showCursor)
    document.removeEventListener('mouseleave', this.hideCursor)

    // Remover eventos de hover de los elementos interactivos
    this.removeHoverListeners()

    // Cancelar la animación de seguimiento
    cancelAnimationFrame(this.animationFrameId)
  },
  updated() {
    // Cuando el componente se actualiza, refrescamos los listeners
    this.refreshHoverListeners()
  }
}
</script>

<style scoped>
.custom-cursor {
  z-index: 9999; /* Asegura que el cursor esté por encima de todos los elementos */
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  pointer-events: none; /* Permite que los elementos debajo del cursor personalizado sigan siendo interactivos */
  transition: opacity 0.15s ease; /* Mueve solo la opacidad */
  transform: translate(-50%, -50%);
  opacity: 0; /* Por defecto, el cursor es invisible */
}
.custom-cursor-circle {
  z-index: 9998; /* Asegura que el cursor esté por encima de todos los elementos */
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: transparent;
  pointer-events: none; /* Permite que los elementos debajo del cursor personalizado sigan siendo interactivos */
  transition:
    transform 0.15s ease,
    opacity 0.15s ease; /* Mueve el tamaño y opacidad */
  transform: translate(-50%, -50%);
  opacity: 0; /* Por defecto, el cursor es invisible */
}
</style>
