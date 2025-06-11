<template>
  <div class="game-form">
    <h2>{{ isEditMode ? 'Editar Juego' : 'Crear Juego' }}</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="game.name" placeholder="Nombre del juego" required />
      <input v-model="game.category" placeholder="Categoría" required />
      <input v-model="game.metacriticScore" type="number" placeholder="Puntuación de Metacritic" required />
      <input v-model="game.playtime" type="number" placeholder="Tiempo de juego (horas)" required />
      <button type="submit">{{ isEditMode ? 'Actualizar Juego' : 'Crear Juego' }}</button>
    </form>

    <div v-if="isEditMode">
      <button @click="handleDelete" class="btn-delete">Eliminar Juego</button>
    </div>

    <router-link to="/" class="btn-back-home">Volver al Home</router-link>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { useRoute, useRouter } from 'vue-router'

const gameStore = useGameStore()
const route = useRoute()
const router = useRouter()

// Determinamos si estamos en modo edición o no
const isEditMode = ref(!!route.params.id)

// Juego que se está creando o editando
const game = ref({
  name: '',
  category: '',
  metacriticScore: '',
  playtime: ''
})

// Si estamos editando un juego, cargamos los datos del juego desde el store
watchEffect(() => {
  if (isEditMode.value) {
    const gameToEdit = gameStore.games.find(game => game.id == route.params.id)
    if (gameToEdit) {
      game.value = { ...gameToEdit }
    }
  }
})

function handleSubmit() {
  if (isEditMode.value) {
    // Editar un juego existente
    gameStore.editGame(game.value)
  } else {
    // Crear un juego nuevo
    const newGame = {
      ...game.value,
      id: Date.now(),
      completed: false
    }
    gameStore.addGame(newGame)
  }

  // Redirigimos al listado de juegos después de guardar
  router.push('/games')
}

function handleDelete() {
  if (isEditMode.value) {
    gameStore.deleteGame(game.value.id)
    router.push('/games')
  }
}
</script>

<style scoped>
/* Estilos para el formulario */
.game-form {
  padding: 20px;
  background-color: #3C4453;
  border-radius: 10px;
  color: white;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #767679;
  border-radius: 5px;
  font-size: 16px;
}

button {
  background-color: #D42829;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
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

.btn-delete {
  background-color: #767679;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
}

.btn-delete:hover {
  background-color: #D42829;
}
</style>