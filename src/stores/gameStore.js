import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: JSON.parse(localStorage.getItem('games')) || []
  }),
  actions: {
    addGame(newGame) {
      this.games.push(newGame)
      this.saveGames()
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