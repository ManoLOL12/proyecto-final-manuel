<script setup>
import { computed, ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const games = ref([])
const loading = ref(true)

const completedGames = computed(() =>
  games.value
    .filter(g => g.completed)
    .sort((a, b) => (b.finalScore || 0) - (a.finalScore || 0))
)

const pendingGames = computed(() =>
  games.value
    .filter(g => !g.completed)
    .sort((a, b) => (b.secretScore || 0) - (a.secretScore || 0))
)

async function loadGames() {
  loading.value = true
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('secretScore', { ascending: false })

  if (!error) {
    games.value = data
  } else {
    console.error('Error al cargar juegos:', error)
  }

  loading.value = false
}


async function toggleCompletion(game) {
  const newCompleted = !game.completed

  const updated = {
    completed: newCompleted,
    completionDate: newCompleted
      ? new Date().toISOString().split('T')[0]
      : null
  }

  const { error } = await supabase
    .from('games')
    .update(updated)
    .eq('id', game.id)

  if (!error) {
    await loadGames()
  } else {
    console.error('Error al actualizar juego:', error)
  }
}

function toggleGameCompletion(id) {
  const game = games.value.find(g => g.id === id)
  if (!game) return
  toggleCompletion(game)
}

function formatDate(isoDate) {
  const date = new Date(isoDate)
  return date.toLocaleDateString('es-ES')
}

onMounted(loadGames)
</script>

<template>
  <div class="game-list-page">
    <h1>Tu Lista de Videojuegos</h1>

    <div class="columns">
      <div class="column">
        <h2 class="centered">Por Completar</h2>
        <ul>
          <li v-for="game in pendingGames" :key="game.id">
            <div>
              <h3>{{ game.name }}</h3>
              <p>Categoria: {{ game.category }}</p>
              <p v-if="game.tags && game.tags.length > 0">Etiquetas: {{ game.tags.join(', ') }}</p>
              <p>Metacritic: {{ game.metacriticScore }}</p>
              <p>Tiempo de juego: {{ game.playtime }} horas</p>
              <p v-if="game.completed && game.finalScore !== null">Puntuación final: {{ game.finalScore }}/10</p>
              <p v-if="game.completed">Completado el ({{ formatDate(game.completionDate) }})</p>
              <router-link :to="`/edit-game/${game.id}`" class="button">Editar</router-link>
              <button @click="toggleGameCompletion(game.id)" class="button">
                {{ game.completed ? 'Marcar como incompleto' : 'Marcar como completado' }}
              </button>
            </div>
          </li>
        </ul>
      </div>

      <div class="column">
        <h2 class="centered">Completados</h2>
        <ul class="">
          <li v-for="game in completedGames" :key="game.id">
            <div>
              <h3>{{ game.name }}</h3>
              <p>Categoria: {{ game.category }}</p>
              <p v-if="game.tags && game.tags.length > 0">Etiquetas: {{ game.tags.join(', ') }}</p>
              <p>Metacritic: {{ game.metacriticScore }}</p>
              <p>Tiempo de juego: {{ game.playtime }} horas</p>
              <p v-if="game.completed && game.finalScore !== null">Puntuación final: {{ game.finalScore }}/10</p>
              <p v-if="game.completed">Completado el ({{ formatDate(game.completionDate) }})</p>
              <router-link :to="`/edit-game/${game.id}`" class="button">Editar</router-link>
              <button @click="toggleGameCompletion(game.id)" class="button">
                {{ game.completed ? 'Marcar como incompleto' : 'Marcar como completado' }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <router-link to="/create-game" class="button">Crear Nuevo Juego</router-link>
    <router-link to="/" class="button">Volver al Inicio</router-link>
  </div>
</template>

<style scoped>
.game-list-page {
  font-family: 'Pixelify sans';
  color: #D7D2D4;
  background-color: #3C4453;
  padding: 20px;
  border-radius: 10px;
}

.game-list-page ul {
  list-style: none;
  padding: 20px;
}

.game-list-page li {
  background-color: #838B93;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

h2 {
  font-size: 2rem;
}

.game-list-page li h3 {
  font-size: 1.5rem;
  color: #D42829;
}

.centered {
  text-align: center;
}

.columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.column {
  flex: 1;
  min-width: 300px;
}

@media (max-width: 768px) {
  .columns {
    flex-direction: column;
  }
}

.button {
  font-family: 'Pixelify sans';
  display: inline-block;
  background-color: #D42829;
  color: #D7D2D4;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
}

.button:hover {
  background-color: #838B93;
}
</style>