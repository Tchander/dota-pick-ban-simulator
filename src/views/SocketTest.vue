<template>
  <div>123qwe</div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import SocketioService from '@/services/socketio.service';

onMounted(() => {
  SocketioService.setupSocketConnection();
});
onBeforeUnmount(() => {
  SocketioService.disconnect();
});
</script>
