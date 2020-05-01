import API from '@/services/API'

export default {
  saveGame (game) {
    return API().post('save-game', game)
  },
  removeGame (id) {
    return API().post('remove-game', { id })
  },
  viewGames () {
    return API().get('view-games')
  },
  login (login) {
    return API().post('login', login)
  }
}
