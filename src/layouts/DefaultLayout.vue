<template>
  <div class="default-layout">
    <!-- В будущем можно будет добавить другие секции(хедер, футер) -->
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  font-family: sans-serif;
  color: #fff;
  background: #2e3032;
}
</style>
