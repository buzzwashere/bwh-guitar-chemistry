import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

type KeyName = 'E' | 'G' | 'A' | 'D'

type ChordData = {
  symbol: string
  subtitle: string
  notes: string
  diagram: string[]
}

const CHORDS: Record<KeyName, ChordData> = {
  E: {
    symbol: 'E',
    subtitle: 'E Major',
    notes: 'E - G# - B',
    diagram: ['e|--0--|', 'B|--0--|', 'G|--1--|', 'D|--2--|', 'A|--2--|', 'E|--0--|']
  },
  G: {
    symbol: 'G',
    subtitle: 'G Major',
    notes: 'G - B - D',
    diagram: ['e|--3--|', 'B|--0--|', 'G|--0--|', 'D|--0--|', 'A|--2--|', 'E|--3--|']
  },
  A: {
    symbol: 'A',
    subtitle: 'A Major',
    notes: 'A - C# - E',
    diagram: ['e|--0--|', 'B|--2--|', 'G|--2--|', 'D|--2--|', 'A|--0--|', 'E|--x--|']
  },
  D: {
    symbol: 'D',
    subtitle: 'D Major',
    notes: 'D - F# - A',
    diagram: ['e|--2--|', 'B|--3--|', 'G|--2--|', 'D|--0--|', 'A|--x--|', 'E|--x--|']
  }
}

export const useChordStore = defineStore('chords', () => {
  const selectedKey = ref<KeyName>('E')

  const keys = computed<KeyName[]>(() => ['E', 'G', 'A', 'D'])
  const currentChord = computed(() => CHORDS[selectedKey.value])

  function setKey(key: KeyName): void {
    selectedKey.value = key
  }

  return {
    selectedKey,
    keys,
    currentChord,
    setKey
  }
})