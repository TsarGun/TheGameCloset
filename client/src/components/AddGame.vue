<template>
    <GameForm @popup="$emit('popup', $event)"/>
</template>

<script>
import GameForm from './GameForm'
export default {
  components: {
    GameForm
  }
}
</script>

<style></style>
