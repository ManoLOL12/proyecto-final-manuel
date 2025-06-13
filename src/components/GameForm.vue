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
    
    game.value = data
    tagInput.value = Array.isArray(data.tags) ? data.tags.join(', ') : ''

    if (game.value.completionDate) {
    const d = new Date(game.value.completionDate)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    game.value.completionDate = `${yyyy}-${mm}-${dd}`
    }
  }
})

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
      <div>      
        <label>Nombre</label>
        <div>
          <input v-model="game.name" placeholder="Nombre del juego" required />
        </div>
      </div>
      <div>      
        <label>Categoría</label>
        <div>
          <input v-model="game.category" placeholder="Categoría" required />
        </div>
      </div>
      <div>      
        <label>Etiquetas</label>
        <div>
          <input v-model="tagInput" placeholder="Etiquetas (separadas por comas)" />
        </div>
      </div>
      <div>      
        <label>Puntuación en Metacritic</label>
        <div>
          <input v-model="game.metacriticScore" type="number" min="0" max="100" placeholder="Puntuación de Metacritic" required />
        </div>
      </div>
      <div>      
        <label>Duración (en horas)</label>
        <div>
          <input v-model="game.playtime" type="number" min="1" placeholder="Tiempo de juego (horas)" required />
        </div>
      </div>

      <div v-if="isEditMode && game.completed">
        <label>Fecha de finalización</label>
        <div>
          <input v-model="game.completionDate" type="date" />
        </div>
      </div>
      <div v-if="game.completed">
        <label>Valoración</label>
        <div>
          <input v-model.number="game.finalScore" type="number" min="0" max="10" placeholder="Valoración del 0 al 10" required />
        </div>
      </div>
      <div class="centered">      
        <button type="submit" class="button">{{ isEditMode ? 'Actualizar Juego' : 'Crear Juego' }}</button>
        <button v-if="isEditMode" @click="handleDelete" class="button">Eliminar Juego</button>
        <router-link to="/games" class="button">Volver</router-link>
      </div>
    </form>
  </div>
</template>

<style>
.game-form {
  background-color: #3C4453;
  border-radius: 10px;
  color: #D7D2D4;
}

.game-form h1 {
  color: #D7D2D4
}

input {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #767679;
  border-radius: 5px;
  font-size: 16px;
}
</style>