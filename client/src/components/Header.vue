<template>
    <header>
        <router-link to="/">Game Closet</router-link><br>
        <router-link to="/add-game">Add a Game</router-link><br>
        <router-link to="/closet">View Closet</router-link><br>
        <button type="button" @click="togglePalette()" />
    </header>
</template>

<script>
export default {
  data: () => ({ light: '🌞', dark: '🌑', toggle: {} }),
  mounted () {
    this.toggle = document.querySelector('[type="button"]')
    this.toggle.innerText =
      document.body.classList.contains('pal-solar-dk')
        ? this.light
        : this.dark
  },
  methods: {
    togglePalette () {
      const config =
        this.toggle.innerText === this.dark
          ? ({
            oldBtn: this.dark,
            newBtn: this.light,
            oldPal: 'pal-solar-lt',
            newPal: 'pal-solar-dk'
          })
          : ({
            oldBtn: this.light,
            newBtn: this.dark,
            oldPal: 'pal-solar-dk',
            newPal: 'pal-solar-lt'
          })
      document.body.classList.replace(config.oldPal, config.newPal)
      this.toggle.innerText = this.toggle.innerText.replace(config.oldBtn, config.newBtn)
    }
  }
}
</script>

<style></style>
