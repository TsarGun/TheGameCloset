<template>
    <div id="closet">
        <span v-if="!viewable.length || !closet.length">There's nothing here!</span>
        <div v-else>
            <Game :game="game" :key="game._id" v-for="game in viewable" @refresh="loadCloset($event)"/>
        </div>
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
        this.$emit('popup', event)
      }
      const { data: response } = await GameClosetAPI.viewGames()
      if (response.ok) {
        this.closet = []
        this.closet.push(...(response.ok))
      } else {
        this.$emit('popup', response)
      }
    }
  }
}
</script>

<style></style>
