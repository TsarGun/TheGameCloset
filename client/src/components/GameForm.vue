<template lang="html">
    <form @submit="processForm($event)">
        <table>
            <tr>
                <td><label for="GameName">Game Name</label></td>
                <td><input type="text" id="GameName" v-model="gameData.title"></td>
            </tr>
            <tr>
                <td><label for="Publisher">Publisher</label></td>
                <td><input type="text" id="Publisher" v-model="gameData.publisher"></td>
            </tr>
            <tr>
                <td><label for="Genre">Genre</label></td>
                <td><input list="Genres" id="Genre" v-model="gameData.genre"></td>
                <datalist id="Genres">
                    <optgroup label="Board Games">
                        <option value="Strategy"></option>
                    </optgroup>
                    <optgroup label="Card Games">
                        <option value="Trading Card Games"></option>
                    </optgroup>
                </datalist>
            </tr>
            <tr>
                <td><label for="MinPlayers">Min Players</label></td>
                <td><input type="number" id="MinPlayers" v-model="gameData.players.min"></td>
            </tr>
            <tr>
                <td><label for="MaxPlayers">Max Players</label></td>
                <td><input type="number" id="MaxPlayers" v-model="gameData.players.max"></td>
            </tr>
            <tr>
                <td colspan="100%">
                    <input type="hidden" id="_id" v-model="gameData._id">
                    <button type="submit">Put in the Closet</button>
                </td>
            </tr>
        </table>
    </form>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI.js'

export default {
  data () {
    return {
      gameData: {
        title: '',
        publisher: '',
        genre: '',
        players: {
          min: 0,
          max: 0
        },
        _id: ''
      }
    }
  },
  mounted () {
    if (this.curData) {
      console.log('Current Game Data', this.curData)
      this.gameData = this.curData
    }
  },
  methods: {
    async processForm (event) {
      event.preventDefault()
      const game = { view: true }
      game.title = this.gameData.title
      game.publisher = this.gameData.publisher
      game.genre = this.gameData.genre
      game.players = this.gameData.players
      if (this.gameData._id) {
        game._id = this.gameData._id
      }
      const { data: response } = await GameClosetAPI.saveGame(game)
      if (response.ok) {
        console.log('OK')
        console.log(response)
        this.gameData = {
          title: '',
          publisher: '',
          genre: '',
          players: {
            min: 0,
            max: 0
          },
          _id: ''
        }
        // Popup modal
        setTimeout(() => this.$router.push('/closet'), 3000)
      } else {
        console.log('NOT OK')
        console.log(response)
      }
    }
  },
  props: ['curData']
}
</script>

<style></style>
