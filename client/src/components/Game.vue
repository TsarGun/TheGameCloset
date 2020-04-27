<template>
    <li>
        <table>
            <tr>
                <td>Game Name</td>
                <td><b>{{ game.title }}</b></td>
            </tr>
            <tr>
                <td>Publisher</td>
                <td><b>{{ game.publisher }}</b></td>
            </tr>
            <tr>
                <td>Game Genre</td>
                <td><b>{{ game.genre }}</b></td>
            </tr>
            <tr>
                <td>Players</td>
                <td><b>{{ game.players.min }} to {{ game.players.max }}</b></td>
            </tr>
            <tr>
                <td>
                    <router-link :to="{ name: 'Update Game', params: { curData: game } }">Update Game</router-link>
                </td>
                <td>
                    Delete? <input type="checkbox" @click="removeGame(game._id)">
                </td>
            </tr>
        </table>
        <!--
        <b>Title</b>: {{ game.title }}<br>
        <b>Publisher</b>: {{ game.publisher }}<br>
        <b>Genre</b>: {{ game.genre }}<br>
        <span v-if="game.players"><b>Players</b>: {{ game.players.min }} to {{ game.players.max }}<br></span>
        Delete? <input type="checkbox" @click="removeGame(game._id)">
        <router-link :to="{ name: 'Update Game', params: { curData: game } }">Update info?</router-link>
        -->
    </li>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI'
export default {
  props: [ 'game' ],
  methods: {
    async removeGame (id) {
      const { data } = await GameClosetAPI.removeGame(id)
      if (data.ok) {
        this.$emit('refresh', data.ok)
      } else {
        console.warn(data.error)
      }
    }
  }
}
</script>

<style></style>
