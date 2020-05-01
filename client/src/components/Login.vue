<template>
    <form @submit="login($event)">
        <input class="curved" placeholder="Username" type="text" name="user" id="user" v-model="credentials.user" />
        <input class="curved" placeholder="Password" type="password" name="pass" id="pass" v-model="credentials.pass"  />
        <button class="curved" type="submit">Login</button>
    </form>
</template>

<script>
import GameClosetAPI from '@/services/GameClosetAPI.js'
export default {
  data: () => ({ credentials: { user: '', pass: '' } }),
  methods: {
    async login (event) {
      event.preventDefault()
      const { data: response } = await GameClosetAPI.login(this.credentials)
      this.$emit('popup', response)
    }
  }
}
</script>

<style></style>
