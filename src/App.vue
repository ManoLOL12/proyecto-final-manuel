<template>
  <div id="app">
    <h1>Lista de Videojuegos</h1>
    <GameForm 
      @add-game="addGame" 
      :game-to-edit="gameToEdit" 
      @edit-game="editGame" 
    />
    <GameList 
      :games="games" 
      @delete-game="deleteGame" 
      @edit-game="prepareEditGame" 
      @complete-game="completeGame"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameForm from './components/GameForm.vue'
import GameList from './components/GameList.vue'

const games = ref([])
const gameToEdit = ref(null)

const addGame = (game) => {
  games.value.push(game)
}

const deleteGame = (index) => {
  games.value.splice(index, 1)
}

const prepareEditGame = ({ index, game }) => {
  gameToEdit.value = { ...game, index }
}

const editGame = (editedGame) => {
  if (gameToEdit.value) {
    games.value.splice(gameToEdit.value.index, 1, editedGame)
    gameToEdit.value = null
  }
}

const completeGame = (index) => {
  const game = games.value[index]
  game.completed = true
  game.completionDate = new Date().toLocaleDateString()
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

body {
  font-family: 'Pixelify Sans', sans-serif;
  margin: 40px;
  background-color: #3C4453; /* Fondo principal */
  color: #D7D2D4; /* Texto principal */
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  color: #D7D2D4; /* Color del título */
}

button {
  background-color: #D42829; /* Fondo de botones */
  color: #D7D2D4; /* Texto de los botones */
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #838B93; /* Hover en botones */
}

button:disabled {
  background-color: #A6A5A1; /* Estado deshabilitado de botones */
  cursor: not-allowed;
}

form input {
  background-color: #767679; /* Fondo de inputs */
  border: 1px solid #838B93; /* Borde de los inputs */
  color: #D7D2D4; /* Color de texto */
  padding: 8px 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 100%;
}

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

li span {
  font-size: 14px;
  color: #838B93; /* Color de la fecha de finalización */
}

li strong {
  font-size: 16px;
}

li button {
  font-size: 12px;
}

li span {
  color: #838B93;
  margin-top: 5px;
  font-style: italic;
}
</style>