<template>
  <ul>
    <li v-for="(game, index) in games" :key="index">
      <div>
        <strong>{{ game.name }}</strong> - {{ game.category }} |
        Etiquetas: {{ game.tags.join(', ') }} |
        Metacritic: {{ game.metacritic }} |
        Tiempo: {{ game.playtime }}h
      </div>

      <div>
        <button @click="deleteGame(index)">Eliminar</button>
        <button @click="editGame(index, game)">Editar</button>
        <button v-if="!game.completed" @click="completeGame(index)">Marcar como completado</button>
        <span v-if="game.completed">Completado el: {{ game.completionDate }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  games: Array
})

const emit = defineEmits(['delete-game', 'edit-game', 'complete-game'])

const deleteGame = (index) => {
  emit('delete-game', index)
}

const editGame = (index, game) => {
  emit('edit-game', { index, game })
}

const completeGame = (index) => {
  emit('complete-game', index)
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #767679; /* Fondo de cada item de la lista */
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li div {
  flex: 1;
}

li button {
  font-size: 12px;
  background-color: #D42829; /* Fondo de botones */
  color: #D7D2D4; /* Texto de los botones */
  border: none;
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
}

li button:hover {
  background-color: #838B93; /* Hover en botones */
}

li span {
  color: #838B93;
  font-style: italic;
  margin-left: 10px;
}
</style>