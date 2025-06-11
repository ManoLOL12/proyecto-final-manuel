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

<style>
.edit-game-page {
  margin-top: 20px;
}
</style>