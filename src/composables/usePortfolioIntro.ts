import { ref } from "vue";

export type IntroPhase = "intro" | "transitioning" | "ready";

export function usePortfolioIntro() {
  const phase = ref<IntroPhase>("intro");
  const progress = ref(0);

  const INTRO_DURATION = 2000; // Duration of the intro animation in milliseconds

  function startIntro() {
    // Run the intro animation
    progress.value = 0;

    const interval = setInterval(() => {
      progress.value += 0.01;
      if (progress.value > 1) {
        clearInterval(interval);
        progress.value = 1;

        setTimeout(() => {
          phase.value = "transitioning";
        }, 100);
      }
    }, INTRO_DURATION / 100);
  }

  function handleTransitionEnd() {
    if (phase.value === "transitioning") {
      phase.value = "ready";
    }
  }

  function skipIntro() {
    progress.value = 1;
    phase.value = "ready";
  }

  return {
    phase,
    progress,
    startIntro,
    skipIntro,
    handleTransitionEnd,
  };
}
