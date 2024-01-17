import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseStep {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

export const useStep = create<UseStep>()(
  persist(
    (set) => ({
      step: 0,
      nextStep: () =>
        set((state) => {
          return {
            step: state.step + 1,
          };
        }),
      prevStep: () =>
        set((state) => {
          return {
            step: state.step - 1,
          };
        }),
    }),
    {
      name: "progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
