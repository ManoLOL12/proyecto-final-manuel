import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: []
  }),
  actions: {
    async addGame(newGame) {
      delete newGame.id
      newGame.secretScore = newGame.metacriticScore / newGame.playtime
      const { data, error } = await supabase
      .from('games')
      .insert([
        newGame
      ])
      .select()
      this.games.push(data[0])
    },
      async loadGames() {
      const { data, error } = await supabase
      .from('games')
      .select()
      .order('secretScore', {ascending: false})
      this.games = data
    },
    editGame(updatedGame) {
      const index = this.games.findIndex(game => game.id === updatedGame.id)
      if (index !== -1) {
        this.games[index] = updatedGame
        this.saveGames() 
      }
    },
    deleteGame(gameId) {
      this.games = this.games.filter(game => game.id !== gameId)
      this.saveGames() 
    },
    saveGames() {
      localStorage.setItem('games', JSON.stringify(this.games))
    },
    toggleCompletion(gameId) {
      const game = this.games.find(g => g.id === gameId)
      if (game) {
        game.completed = !game.completed
        game.completionDate = game.completed
        ? new Date().toLocaleDateString('es-ES')
        : ''
        this.saveGames()
      }
    }
  }
})