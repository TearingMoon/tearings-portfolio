// src/router/meta.d.ts

import "vue-router";

export type StarShapeId = "starfield" | "head" | "cube" | "satellite";

export type ContentPosition = "left" | "right";

export type ContentSurface = "none" | "glass";

declare module "vue-router" {
  interface RouteMeta {
    starShape?: StarShapeId;
    contentPosition?: ContentPosition;
    contentSurface?: ContentSurface;
  }
}

export {};
