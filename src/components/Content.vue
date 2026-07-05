<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChordStore } from '../stores/chords'

const chordStore = useChordStore()
const { keys, selectedKey, currentChord } = storeToRefs(chordStore)
</script>

<template>
  <section class="content-shell row g-4">
    <aside class="col-12 col-lg-4">
      <div class="panel p-3 p-md-4 h-100">
        <h2 class="panel-title">Keys</h2>
        <ul class="list-unstyled m-0 mt-3 d-grid gap-2">
          <li v-for="key in keys" :key="key">
            <button
              type="button"
              class="key-option w-100 text-start"
              :class="{ active: selectedKey === key }"
              @click="chordStore.setKey(key)"
            >
              {{ key }} Major
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <div class="col-12 col-lg-8">
      <div class="panel chord-panel p-4 p-md-5 h-100">
        <div class="symbol-lockup">
          <span class="symbol-pill">{{ currentChord.symbol }}</span>
          <div>
            <h3 class="chord-title mb-1">{{ currentChord.subtitle }}</h3>
            <p class="chord-notes mb-0">{{ currentChord.notes }}</p>
          </div>
        </div>

        <pre class="chord-diagram mt-4 mb-0">{{ currentChord.diagram.join('\n') }}</pre>
      </div>
    </div>
  </section>
</template>