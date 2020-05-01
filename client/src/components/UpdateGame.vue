<template>
    <GameForm :curData="curData" @popup="$emit('popup', $event)" />
</template>

<script>
import GameForm from './GameForm'
export default {
  components: {
    GameForm
  },
  props: [ 'curData' ]
}
</script>

<style></style>
