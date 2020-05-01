<template lang="html">
    <form @submit="processForm($event)">
        <h2>Game Information</h2>
        <input class="curved" placeholder="Game Name" type="text" id="GameName" v-model="gameData.title"><br>
        <input class="curved" placeholder="Publisher" type="text" id="Publisher" v-model="gameData.publisher"><br>
        <input class="curved" placeholder="Genre" list="Genres" id="Genre" v-model="gameData.genre"><br>
        Players: <input class="curved" type="number" id="MinPlayers" v-model="gameData.players.min"> -- <input class="curved" type="number" id="MaxPlayers" v-model="gameData.players.max"><br>
        <br>
        <input type="hidden" id="_id" v-model="gameData._id">
        <button class="curved" type="submit" title="Put in Closet">✔️</button>
        <datalist id="Genres">
            <optgroup label="Board Games">
                <option value="Strategy"></option>
            </optgroup>
            <optgroup label="Card Games">
                <option value="Trading Card Games"></option>
            </optgroup>
        </datalist>
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
      this.gameData = this.curData
    }
  },
  methods: {
    async processForm (event) {
      event.preventDefault()
      const game = Object.assign({ view: true }, this.gameData)
      if (game._id === '') {
        delete game._id
      }
      const { data: response } = await GameClosetAPI.saveGame(game)
      if (response.ok) {
        this.$router.push('/closet')
      }
      this.$emit('popup', response)
    }
  },
  props: ['curData']
}
</script>

<style></style>
