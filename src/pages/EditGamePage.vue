<script setup>
import GameForm from '../components/GameForm.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const gameId = computed(() => route.params.id)
</script>

<template>
  <div class="edit-game-page">
    <GameForm v-if="gameId" :game-id="gameId" />
  </div>
</template>

<style scoped>
.edit-game-page {
  padding: 20px;
  background-color: #3C4453;
  border-radius: 10px;
  color: #D7D2D4;
  text-align: center;
}
</style>