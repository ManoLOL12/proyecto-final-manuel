<template>
  <div class="create-game-page">
    <GameForm />
  </div>
  <div class="create-game-page">
    <router-link to="/games" class="button">Ver lista de juegos</router-link>
  </div>
</template>

<script setup>
import GameForm from '../components/GameForm.vue'
</script>

<style>
.create-game-page {
  padding: 20px;
  background-color: #3C4453;
  border-radius: 10px;
  color: #D7D2D4;
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #D42829;
  margin-bottom: 20px;
}
</style>