///Declares types for Vue files
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Extend vue-router types for route meta
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
