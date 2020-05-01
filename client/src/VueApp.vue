<template>
    <div id="vue-app">
        <Header @popup="popup($event)" @toggle="togglePalette($event)" :loggedIn="loggedIn" :toggle="toggle" />
        <div id="notify" class="curved" />
        <main class="curved">
            <router-view @popup="popup($event)"/>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'VueApp',
  computed: {
    notify: () => document.querySelector('#notify'),
    toggle () { return document.body.className.endsWith('lt') ? this.dark : this.light }
  },
  data () {
    return {
      light: '🌞',
      dark: '🌑',
      loggedIn: false
    }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    // TODO: Maybe cookie to see user preference for color scheme
    document.body.className = 'pal-solar-lt'
    console.log(document.body.className)
    console.log(this.toggle)
  },
  methods: {
    popup (event) {
      let popMsg, popClass
      if (event.ok) {
        // Good Things!
        popClass = 'success'
        const response = event.ok
        if (response.loggedIn) {
          this.loggedIn = response.loggedIn
          popMsg = 'You are now logged in!'
        } else if (response.added) {
          popMsg = 'A new game was added to your closet'
        } else if (response.updated) {
          popMsg = 'Game information has been updated'
        } else if (response.removed) {
          popMsg = 'Game was marked for removal'
        } else {
          popMsg = ' Uh... what'
          popClass = 'warning'
        }
      } else {
        // Bad Things!
        popMsg = event.error
        popClass = 'error'
      }

      this.notify.style.animationName = 'slidedown'
      this.notify.innerText = popMsg
      this.notify.classList.add(popClass)
      const dur = parseFloat(getComputedStyle(this.notify).animationDuration) * 1000
      setTimeout(() => {
        this.notify.style.animationName = 'slideup'
        setTimeout(() => {
          this.notify.innerText = ''
          this.notify.classList.remove('error', 'warning', 'success')
        }, dur * 0.9)
      }, dur * 1.5)
    },
    togglePalette () {
      const { oldPal, newPal } =
        (document.body.className.endsWith('lt'))
          ? ({
            oldPal: 'lt',
            newPal: 'dk'
          })
          : ({
            oldPal: 'dk',
            newPal: 'lt'
          })
      document.body.className = document.body.className.replace(oldPal, newPal)
    }
  }
}
</script>

<style>
@import './assets/css/layouts.css';
@import './assets/css/palettes.css';
@import './assets/css/animations.css';
</style>
