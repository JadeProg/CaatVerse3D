// controlsStore.js
import { create } from 'zustand'

export const useControlsStore = create((set) => ({
  forward: false,
  backward: false,
  left: false,
  right: false,

  setControls: (controls) => set(controls),
}))
