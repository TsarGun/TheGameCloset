<template>
    <GameForm :curData="curData" />
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
