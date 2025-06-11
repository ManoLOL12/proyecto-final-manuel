<script setup>
import { computed, onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()

const games = computed(() => {
  return gameStore.games
})

function toggleGameCompletion(gameId) {
  gameStore.toggleCompletion(gameId)
}

onMounted(() => {
  gameStore.loadGames()
})
</script>

<template>
  <div class="game-list-page">
    <h1>Tu Lista de Videojuegos</h1>
    <ul>
    <li v-for="game in games" :key="game.id"> 
        <div>
          <h2>{{ game.name }}</h2>
          <p>Categoria: {{ game.category }}</p>
          <p v-if="game.tags && game.tags.length > 0">Etiquetas: {{ game.tags.join(', ') }}</p>
          <p>Puntuación: {{ game.metacriticScore }}</p>
          <p>Tiempo de juego: {{ game.playtime }} horas</p>
          <p v-if="game.completed">Completado el ({{ game.completionDate }})</p>
          <router-link :to="`/edit-game/${game.id}`" class="button">Editar</router-link>
          <button @click="toggleGameCompletion(game.id)" class="button">
            {{ game.completed ? 'Marcar como incompleto' : 'Marcar como completado' }}
          </button>
        </div>
      </li>
    </ul>
    <router-link to="/create-game" class="button">Crear Nuevo Juego</router-link>
    <router-link to="/" class="button">Volver al Inicio</router-link>
  </div>
</template>

<style>
.game-list-page {
  font-family: 'Pixelify sans';
  color: #D7D2D4;
  background-color: #3C4453;
  padding: 20px;
  border-radius: 10px;
}

.game-list-page ul {
  list-style: none;
  padding: 0;
}

.game-list-page li {
  background-color: #838B93;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
}

.game-list-page li h2 {
  color: #D42829;
}

.button {
  font-family: 'Pixelify sans';
  display: inline-block;
  background-color: #D42829;
  color: #D7D2D4;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.button:hover {
  background-color: #838B93;
}
</style>