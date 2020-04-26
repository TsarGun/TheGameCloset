<template>
    <div id="vue-app">
        <Header />
            <main>
                <router-view />
            </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'VueApp',
  data () {
    return {}
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    // TODO: Maybe cookie to see user preference for color scheme
    document.body.classList.add('pal-solar-lt')
  }
}
</script>

<style>
@import './assets/css/layouts.css';
@import './assets/css/palettes.css';
</style>
