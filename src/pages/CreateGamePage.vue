<template>
  <div class="create-game-page">
    <GameForm />
  </div>
</template>

<script setup>
import GameForm from '../components/GameForm.vue'
</script>

<style scoped>
/* Estilos para la página de creación de juegos */
.create-game-page {
  padding: 20px;
  background-color: #3C4453;
  border-radius: 10px;
  color: white;
  text-align: center;
}

h2 {
  font-size: 2rem;
  color: #D42829;
  margin-bottom: 20px;
}
</style>