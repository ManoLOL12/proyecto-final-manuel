<template>
  <div>
    <h1>Editar Juego</h1>
    <GameForm :game-to-edit="gameToEdit" @edit-game="editGame" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameForm from '../components/GameForm.vue'

const route = useRoute()
const router = useRouter()

const gameToEdit = ref(null)

onMounted(() => {
  const gameId = route.params.id
  // Aquí debes cargar el juego a editar (por ejemplo, de una lista o base de datos)
  // Usamos un array de ejemplo:
  const games = [
    { name: 'Juego 1', category: 'Acción', tags: ['Aventura'], metacritic: 85, playtime: 20, completed: false },
    { name: 'Juego 2', category: 'RPG', tags: ['Rol'], metacritic: 90, playtime: 50, completed: false }
  ]
  gameToEdit.value = games[gameId]
})

const editGame = (editedGame) => {
  // Aquí deberías actualizar el juego en la lista
  console.log('Juego editado:', editedGame)
  router.push('/games')
}
</script>

<style scoped>
h1 {
  color: #D7D2D4;
  text-align: center;
}
</style>
