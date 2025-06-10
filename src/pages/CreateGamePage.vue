<template>
  <div>
    <router-link to="/games" class="btn-back-home">Volver a tu lista</router-link>

    <h1>Crear Nuevo Juego</h1>
    <GameForm @add-game="addGame" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameForm from '../components/GameForm.vue'

const addGame = (game) => {
  // Aquí puedes agregar la lógica para agregar el juego a la lista, por ejemplo, en un array o base de datos
  console.log('Juego agregado:', game)
}
</script>

<style>
h1 {
  color: #D7D2D4;
  text-align: center;
}

.btn-back-home {
  display: inline-block;
  background-color: #3C4453;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.btn-back-home:hover {
  background-color: #D42829;
}
</style>
