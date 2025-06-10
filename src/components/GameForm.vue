<template>
  <form @submit.prevent="submitForm">
    <input v-model="name" placeholder="Nombre del juego" required />
    <input v-model="category" placeholder="Categoría" required />
    <input v-model="tags" placeholder="Etiquetas (separadas por coma)" />
    <input v-model.number="metacritic" type="number" placeholder="Puntuación Metacritic" min="0" max="100" />
    <input v-model.number="playtime" type="number" placeholder="Tiempo de juego (horas)" />
    <button type="submit">{{ gameToEdit ? 'Editar juego' : 'Agregar juego' }}</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  gameToEdit: Object
})

const name = ref('')
const category = ref('')
const tags = ref('')
const metacritic = ref(null)
const playtime = ref(null)

watch(() => props.gameToEdit, (newGame) => {
  if (newGame) {
    name.value = newGame.name
    category.value = newGame.category
    tags.value = newGame.tags.join(', ')
    metacritic.value = newGame.metacritic
    playtime.value = newGame.playtime
  }
}, { immediate: true })

const submitForm = () => {
  const game = {
    name: name.value,
    category: category.value,
    tags: tags.value.split(',').map(tag => tag.trim()),
    metacritic: metacritic.value,
    playtime: playtime.value,
    completed: false,
    completionDate: null
  }

  if (props.gameToEdit) {
    emit('edit-game', game)
  } else {
    emit('add-game', game)
  }

  resetForm()
}

const resetForm = () => {
  name.value = ''
  category.value = ''
  tags.value = ''
  metacritic.value = null
  playtime.value = null
}

const emit = defineEmits(['add-game', 'edit-game'])
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
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

form input::placeholder {
  color: #D7D2D4; /* Color más claro para los placeholders */
  opacity: 0.7; /* Hacer que el placeholder sea un poco más suave */
}

button {
  background-color: #D42829; /* Fondo de botones */
  color: #D7D2D4; /* Texto de los botones */
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
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
</style>