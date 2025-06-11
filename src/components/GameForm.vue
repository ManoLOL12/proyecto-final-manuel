<script setup>
import { ref, watchEffect } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { useRoute, useRouter } from 'vue-router'

const gameStore = useGameStore()
const route = useRoute()
const router = useRouter()

const isEditMode = ref(!!route.params.id)

const game = ref({
  name: '',
  category: '',
  tags: [],
  metacriticScore: '',
  playtime: '',
  completed: false,
  completionDate: null
})

const tagInput = ref('')

watchEffect(() => {
  if (isEditMode.value) {
    const gameToEdit = gameStore.games.find(game => game.id == route.params.id)
    if (gameToEdit) {
      game.value = { ...gameToEdit }
      tagInput.value = Array.isArray(gameToEdit.tags) ? gameToEdit.tags.join(', ') : ''
    } else {
      router.push('/games')
    }
  }
})

function handleCompletionChange() {
  if (game.value.completed) {
    const today = new Date()
    game.value.completionDate = today.toLocaleDateString('es-ES')
  } else {
    game.value.completionDate = ''
  }
}

function handleSubmit() {
    const tagsArray = tagInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

    game.value.tags = tagsArray

  if (isEditMode.value) {
    gameStore.editGame(game.value)
  } else {
    const newGame = {
      ...game.value,
      id: Date.now(),
      completed: false
    }
    gameStore.addGame(newGame)
  }
  router.push('/games')
}

function handleDelete() {
  if (isEditMode.value) {
    gameStore.deleteGame(game.value.id)
    router.push('/games')
  }
}
</script>

<template>
  <div class="game-form">
    <h1>{{ isEditMode ? 'Editar Juego' : 'Añadir Juego' }}</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="game.name" placeholder="Nombre del juego" required />
      <input v-model="game.category" placeholder="Categoría" required />
      <input v-model="tagInput" placeholder="Etiquetas (separadas por comas)" />
      <input v-model="game.metacriticScore" type="number" placeholder="Puntuación de Metacritic" required />
      <input v-model="game.playtime" type="number" placeholder="Tiempo de juego (horas)" required />
      <button type="submit" class="button">{{ isEditMode ? 'Actualizar Juego' : 'Crear Juego' }}</button>
    </form>
    <div v-if="isEditMode">
      <button @click="handleDelete" class="button">Eliminar Juego</button>
    </div>
    <router-link to="/games" class="button">Volver</router-link>
  </div>
</template>

<style>
.game-form {
  padding: 20px;
  background-color: #3C4453;
  border-radius: 10px;
  color: #D7D2D4;
}

.game-form h1 {
  color: #D7D2D4
}

input {
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #767679;
  border-radius: 5px;
  font-size: 16px;
}

.button {
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