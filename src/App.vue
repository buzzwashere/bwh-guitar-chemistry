<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <header class="app-header">
    <nav class="navbar h-100">
      <div class="container-fluid px-3 px-md-4 d-flex align-items-center justify-content-start gap-2">
        <img src="/guitar.svg" alt="" class="brand-icon" />
        <span class="brand-mark">Guitar Chemistry</span>
      </div>
    </nav>
  </header>

  <main class="app-main container-fluid px-3 px-md-4 py-4 py-md-5">
    <RouterView />
  </main>

  <footer class="app-footer">
    <p>Copyright {{ currentYear }}, buzz.was.here</p>
  </footer>
</template>
