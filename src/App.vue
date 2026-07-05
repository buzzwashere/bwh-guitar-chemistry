<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <header class="app-header">
    <nav class="navbar h-100">
      <div class="container-fluid px-3 px-md-4">
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
