import { supabase } from '@/lib/supabase'

games = []

export async function addGame(newGame) {
  delete newGame.id
  newGame.secretScore = newGame.metacriticScore / newGame.playtime
  const { data, error } = await supabase
  .from('games')
  .insert([
    newGame
  ])
  .select()
  this.games.push(data[0])
}
export async function loadGames() {
  const { data, error } = await supabase
  .from('games')
  .select()
  .order('secretScore', {ascending: false})
  this.games = data
}

export async function editGame(updatedGame) {
  updatedGame.secretScore = updatedGame.metacriticScore / updatedGame.playtime
  const { data, error } = await supabase
    .from('games')
    .update(updatedGame)
    .eq('id', updatedGame.id)
    .select()

  if (!error) {
    const index = this.games.findIndex(game => game.id === updatedGame.id)
    if (index !== -1) {
      this.games[index] = data[0]
    }
  }
}

export async function deleteGame(gameId) {
  const { error } = await supabase
    .from('games')
    .delete()
    .eq('id', gameId)

  if (!error) {
    this.games = this.games.filter(game => game.id !== gameId)
  }
}