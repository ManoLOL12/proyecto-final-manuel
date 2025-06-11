import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: JSON.parse(localStorage.getItem('games')) || []  // Cargamos los juegos desde localStorage
  }),
  actions: {
    addGame(newGame) {
      this.games.push(newGame)
      this.saveGames()  // Guardamos los juegos actualizados en localStorage
    },
    editGame(updatedGame) {
      const index = this.games.findIndex(game => game.id === updatedGame.id)
      if (index !== -1) {
        this.games[index] = updatedGame
        this.saveGames()  // Guardamos los juegos actualizados en localStorage
      }
    },
    deleteGame(gameId) {
      this.games = this.games.filter(game => game.id !== gameId)
      this.saveGames()  // Guardamos los juegos actualizados en localStorage
    },
    saveGames() {
      localStorage.setItem('games', JSON.stringify(this.games))
    }
  }
})