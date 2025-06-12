<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const props = defineProps({
  gameId: String
})

const isEditMode = computed(() => !!props.gameId)
const router = useRouter()

const game = ref({
  name: '',
  category: '',
  tags: [],
  metacriticScore: null,
  playtime: null,
  completed: false,
  completionDate: null,
  finalScore: null
})

const tagInput = ref('')

onMounted(async () => {
  if (isEditMode.value) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', props.gameId)
      .single()

    if (error) {
      console.error('Error al cargar el juego:', error)
      return router.push('/games')
    }
    else
    game.value = data
    tagInput.value = Array.isArray(data.tags) ? data.tags.join(', ') : ''
  }
})

function handleCompletionChange() {
  game.value.completionDate = game.value.completed
    ? new Date().toLocaleDateString('es-ES')
    : ''
}

async function handleSubmit() {
  game.value.tags = tagInput.value.split(',').map(tag => tag.trim()).filter(Boolean)
  game.value.secretScore = game.value.metacriticScore / game.value.playtime

  if (isEditMode.value) {
    const { error } = await supabase
      .from('games')
      .update(game.value)
      .eq('id', props.gameId)

    if (error) console.error('Error actualizando juego:', error)
  } else {
    const { error } = await supabase
      .from('games')
      .insert(game.value)

    if (error) console.error('Error creando juego:', error)
  }

  router.push('/games')
}

async function handleDelete() {
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', props.gameId)

  if (error) console.error('Error eliminando juego:', error)

  router.push('/games')
}
</script>

<template>
  <div class="game-form">
    <h1>{{ isEditMode ? 'Editar Juego' : 'Añadir Juego' }}</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="game.name" placeholder="Nombre del juego" required />
      <input v-model="game.category" placeholder="Categoría" required />
      <input v-model="tagInput" placeholder="Etiquetas (separadas por comas)" />
      <input v-model="game.metacriticScore" type="number" min="0" max="100" placeholder="Puntuación de Metacritic" required />
      <input v-model="game.playtime" type="number" min="1" placeholder="Tiempo de juego (horas)" required />
      <div v-if="game.completed">
        <label>Puntuación final:</label>
        <input v-model.number="game.finalScore" type="number" min="0" max="10" placeholder="Valoración del 0 al 10" required />
      </div>
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