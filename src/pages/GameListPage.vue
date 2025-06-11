<template>
  <div class="game-list-page">
    <h1>Tu Lista de Videojuegos</h1>
    <ul>
      <li v-for="game in gameStore.games" :key="game.id">
        <div>
          <h2>{{ game.name }}</h2>
          <p>Categoria: {{ game.category }}</p>
          <p>Puntuación: {{ game.metacriticScore }}</p>
          <p>Tiempo de juego: {{ game.playtime }} horas</p>
          <p v-if="game.completed">Completado: Sí ({{ game.completionDate }})</p>
          <router-link :to="`/edit-game/${game.id}`" class="button">Editar</router-link>
        </div>
      </li>
    </ul>
    <router-link to="/create-game" class="button">Crear Nuevo Juego</router-link>
    <router-link to="/" class="button">Volver al Inicio</router-link>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

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
  display: inline-block;
  background-color: #D42829;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.button:hover {
  background-color: #838B93;
}
</style>