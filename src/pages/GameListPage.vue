<template>
  <div>
    <h1>Lista de Videojuegos</h1>
    <GameList :games="games" @delete-game="deleteGame" @edit-game="goToEditPage" @complete-game="completeGame" />
    <router-link to="/create">
      <button>Agregar nuevo juego</button>
    </router-link>
  </div>

  <div>
    <router-link to="/" class="btn-back-home">Volver al Home</router-link>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import GameList from '../components/GameList.vue'

const games = ref([])

const deleteGame = (index) => {
  games.value.splice(index, 1)
}

const goToEditPage = (index, game) => {
  // redirigir a la página de editar pasando el id o el objeto completo
  router.push({ name: 'EditGame', params: { id: index } })
}

const completeGame = (index) => {
  const game = games.value[index]
  game.completed = true
  game.completionDate = new Date().toLocaleDateString()
}
</script>

<style>
h1 {
  color: #D7D2D4;
  text-align: center;
}

button {
  background-color: #D42829;
  color: #D7D2D4;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #838B93;
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
