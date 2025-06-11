<template>
  <div class="game-list-page">
    <h2>Lista de Videojuegos</h2>
    <ul>
      <li v-for="game in gameStore.games" :key="game.id">
        <div>
          <h3>{{ game.name }}</h3>
          <p>Categoria: {{ game.category }}</p>
          <p>Puntuación: {{ game.metacriticScore }}</p>
          <p>Tiempo de juego: {{ game.playtime }} horas</p>
          <p v-if="game.completed">Completado: Sí ({{ game.completionDate }})</p>
          <router-link :to="`/edit-game/${game.id}`" class="btn-edit">Editar</router-link>
        </div>
      </li>
    </ul>
    <router-link to="/create-game" class="btn-create">Crear Nuevo Juego</router-link>
    <router-link to="/" class="btn-create">Volver al Inicio</router-link>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<style scoped>
/* Estilos para la lista de juegos */
.game-list-page {
  font-family: 'Arial', sans-serif;
  color: white;
  background-color: #3C4453;
  padding: 20px;
  border-radius: 10px;
}

.game-list-page ul {
  list-style: none;
  padding: 0;
}

.game-list-page li {
  background-color: #D7D2D4;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
}

.game-list-page li h3 {
  color: #D42829;
}

.btn-edit {
  background-color: #767679;
  color: white;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
}

.btn-edit:hover {
  background-color: #838B93;
}

.btn-create {
  display: inline-block;
  background-color: #D42829;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.btn-create:hover {
  background-color: #838B93;
}
</style>