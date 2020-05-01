<template>
    <header class="curved">
        <span class="title">The Game Closet</span>
        <span id="navbar">
            <span v-if="loggedIn">
                <button class="curved" type="button" @click="link('/')" title="Home">🎲</button>
                <button class="curved" type="button" @click="link('/add-game')" title="Add...">➕</button>
                <button class="curved" type="button" @click="link('/closet')" title="View...">📃</button>
                <button class="curved" type="button" id="toggle" @click="togglePalette()" title="Toggle Night Mode">{{ toggle }}</button>
            </span>
            <Login v-else @popup="$emit('popup', $event)"/>
        </span>
    </header>
</template>

<script>
import Login from './Login'
export default {
  components: { Login },
  props: [ 'loggedIn', 'toggle' ],
  methods: {
    togglePalette () {
      this.$emit('toggle')
    },
    test () {
      this.$router.push('/')
    },
    async link (src) {
      try {
        await this.$router.push(src)
      } catch (err) { }
    }
  }
}
</script>

<style></style>
