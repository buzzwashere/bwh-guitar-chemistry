import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

type KeyName = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
type ModeName =
  | 'Ionian'
  | 'Dorian'
  | 'Phrygian'
  | 'Lydian'
  | 'Mixolydian'
  | 'Aeolian'
  | 'Locrian'
  | 'Natural minor'
  | 'Harmonic minor'
  | 'Melodic minor'
  | 'Altered scale'

const KEYS: KeyName[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const MODES: ModeName[] = [
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian'
]
const MINOR_SCALES: ModeName[] = ['Natural minor', 'Harmonic minor', 'Melodic minor']
const ALTERED_SCALES: ModeName[] = ['Altered scale']

export const useChordStore = defineStore('chords', () => {
  const selectedKey = ref<KeyName>('C')
  const selectedMode = ref<ModeName>('Ionian')

  const keys = computed<KeyName[]>(() => KEYS)
  const modes = computed<ModeName[]>(() => MODES)
  const minorScales = computed<ModeName[]>(() => MINOR_SCALES)
  const alteredScales = computed<ModeName[]>(() => ALTERED_SCALES)

  function setKey(key: KeyName): void {
    selectedKey.value = key
  }

  function setMode(mode: ModeName): void {
    selectedMode.value = mode
  }

  return {
    selectedKey,
    selectedMode,
    keys,
    modes,
    minorScales,
    alteredScales,
    setKey,
    setMode
  }
})
