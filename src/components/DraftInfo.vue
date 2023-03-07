<template>
  <div class="draft-info">
    <draft-list
      class="draft-list"
      :player="playerStore.radiantPlayer"
      :team="TeamList.RADIANT"
    />
    <draft-list
      class="draft-list"
      :player="playerStore.direPlayer"
      :team="TeamList.DIRE"
    />
  </div>
</template>

<script setup lang="ts">
import DraftList from '@/components/DraftList.vue';
import { usePlayerStore } from '@/stores/player';
import { TeamList } from '@/enum/teams';

const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
.draft-info {
  display: flex;
  width: 100%;
  gap: 2rem;
}

.draft-list {
  width: 50%;
}
</style>
