<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useChordStore } from '../stores/chords'

const chordStore = useChordStore()
const { keys, selectedKey, modes, minorScales, alteredScales, selectedMode } =
  storeToRefs(chordStore)

const FRET_COUNT = 22
const STRING_COUNT = 6
const SINGLE_MARKER_FRETS = [3, 5, 7, 9, 15, 17, 19, 21]

const SEMITONE: Record<string, number> = {
  C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5,
  'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11
}

const MODE_DESCRIPTIONS: Record<string, string> = {
  Ionian:
    'Ionian (I): 1 2 3 4 5 6 7 — major scale itself; bright, stable, familiar.',
  Dorian:
    'Dorian (II): 1 2 b3 4 5 6 b7 — minor with raised 6; soulful, wistful, melancholy with lift, versatile, often used in jazz/funk and pop.',
  Phrygian:
    'Phrygian (III): 1 b2 b3 4 5 b6 b7 — minor with b2; dark, Spanish flavour, mysterious, Renaissance.',
  Lydian:
    'Lydian (IV): 1 2 3 #4 5 6 7 — major with #4; dreamy, floaty, other-worldly, modern.',
  Mixolydian:
    'Mixolydian (V): 1 2 3 4 5 6 b7 — major with b7; used in blues, jazz, rock and some folk styles; frequently used with dominant 7th chords.',
  Aeolian:
    'Aeolian (VI): 1 2 b3 4 5 b6 b7 — natural minor; melancholy, used in folk styles a lot (among other styles).',
  Locrian:
    'Locrian (VII): 1 b2 b3 4 b5 b6 b7 — contains diminished 5th degree; unstable, rare, tense, unresolved.',
  'Natural minor':
    'Natural minor: 1 2 b3 4 5 b6 b7 — same intervals as Aeolian; melancholy, used in folk styles a lot (among other styles).'
}

const MODE_INTERVALS: Record<string, number[]> = {
  Ionian:            [0, 2, 4, 5, 7, 9, 11],
  Dorian:            [0, 2, 3, 5, 7, 9, 10],
  Phrygian:          [0, 1, 3, 5, 7, 8, 10],
  Lydian:            [0, 2, 4, 6, 7, 9, 11],
  Mixolydian:        [0, 2, 4, 5, 7, 9, 10],
  Aeolian:           [0, 2, 3, 5, 7, 8, 10],
  Locrian:           [0, 1, 3, 5, 6, 8, 10],
  'Natural minor':   [0, 2, 3, 5, 7, 8, 10],
  'Harmonic minor':  [0, 2, 3, 5, 7, 8, 11],
  'Melodic minor':   [0, 2, 3, 5, 7, 9, 11],
  'Altered scale':   [0, 1, 3, 4, 6, 8, 10]
}

// Standard tuning, top-of-diagram to bottom: high e, B, G, D, A, low E
const STRING_OPEN_SEMITONES = [4, 11, 7, 2, 9, 4]
// Vertical center of each string as % of neck height (6 equal lanes)
const STRING_TOPS = [8.33, 25, 41.67, 58.33, 75, 91.67]

const currentDescription = computed(() => MODE_DESCRIPTIONS[selectedMode.value] ?? '')

const scaleSet = computed(() => {
  const root = SEMITONE[selectedKey.value]
  const intervals = MODE_INTERVALS[selectedMode.value]
  return new Set(intervals.map(i => (root + i) % 12))
})

type NoteDot = { string: number; top: number }

function dotsAtFret(fret: number): NoteDot[] {
  const result: NoteDot[] = []
  for (let i = 0; i < STRING_OPEN_SEMITONES.length; i++) {
    const note = (STRING_OPEN_SEMITONES[i] + fret) % 12
    if (scaleSet.value.has(note)) {
      result.push({ string: i, top: STRING_TOPS[i] })
    }
  }
  return result
}
</script>

<template>
  <section class="content-shell d-grid gap-4">
    <div class="panel p-3 p-md-4">
      <h2 class="panel-title">Keys</h2>
      <div class="key-row mt-3">
        <button
          v-for="key in keys"
          :key="key"
          type="button"
          class="key-btn"
          :class="{ active: selectedKey === key }"
          :aria-pressed="selectedKey === key"
          @click="chordStore.setKey(key)"
        >
          {{ key }}
        </button>
      </div>
      <h2 class="panel-title mt-4">Modes / Scales</h2>
      <div class="key-row mt-3">
        <button
          v-for="mode in modes"
          :key="mode"
          type="button"
          class="key-btn"
          :class="{ active: selectedMode === mode }"
          :aria-pressed="selectedMode === mode"
          @click="chordStore.setMode(mode)"
        >
          {{ mode }}
          <span v-if="mode === 'Aeolian'" class="key-btn-sub">Natural minor</span>
        </button>
      </div>
      <div class="key-row mt-2">
        <button
          v-for="scale in minorScales"
          :key="scale"
          type="button"
          class="key-btn"
          :class="{ active: selectedMode === scale }"
          :aria-pressed="selectedMode === scale"
          @click="chordStore.setMode(scale)"
        >
          {{ scale }}
          <span v-if="scale === 'Natural minor'" class="key-btn-sub">Aeolian mode</span>
        </button>
        <span class="key-row-sep" aria-hidden="true"></span>
        <button
          v-for="scale in alteredScales"
          :key="scale"
          type="button"
          class="key-btn"
          :class="{ active: selectedMode === scale }"
          :aria-pressed="selectedMode === scale"
          @click="chordStore.setMode(scale)"
        >
          {{ scale }}
        </button>
      </div>
      <p class="mode-description mt-3 mb-0">{{ currentDescription }}</p>
    </div>

    <div class="panel p-3 p-md-4">
      <h2 class="panel-title">Fretboard</h2>
      <div class="fretboard mt-3">
        <div class="fretboard-neck">
          <div class="nut">
            <span
              v-for="dot in dotsAtFret(0)"
              :key="dot.string"
              class="note-dot"
              :style="{ top: `${dot.top}%` }"
            ></span>
          </div>
          <div v-for="n in FRET_COUNT" :key="n" class="fret">
            <span v-if="SINGLE_MARKER_FRETS.includes(n)" class="marker"></span>
            <template v-if="n === 12">
              <span class="marker marker-top"></span>
              <span class="marker marker-bottom"></span>
            </template>
            <span
              v-for="dot in dotsAtFret(n)"
              :key="dot.string"
              class="note-dot"
              :style="{ top: `${dot.top}%` }"
            ></span>
          </div>
          <div class="strings">
            <div v-for="s in STRING_COUNT" :key="s" class="string-lane">
              <div class="string" :class="`string-${s}`"></div>
            </div>
          </div>
        </div>
        <div class="fret-labels">
          <div class="nut-spacer"></div>
          <div v-for="n in FRET_COUNT" :key="n" class="fret-label">{{ n }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
