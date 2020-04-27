<template>
    <div id="closet">
        <ul v-if="viewable.length">
            <Game :game="game" :key="game._id" v-for="game in viewable" @refresh="loadCloset($event)"/>
        </ul>
    </div>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI.js'
import Game from './Game'
export default {
  components: {
    Game
  },
  computed: {
    viewable () { return this.closet.filter(game => game.view) }
  },
  data: () => ({ closet: [] }),
  mounted () { return this.loadCloset() },
  methods: {
    async loadCloset (event) {
      if (event) {
        // Popup Modal
      }
      const { data } = await GameClosetAPI.viewGames()
      if (data.ok) {
        this.closet = []
        this.closet.push(...(data.ok))
      } else {
        console.warn(data.error)
      }
    }
  }
}
</script>

<style></style>
