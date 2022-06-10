<template>
  <section class="chance-cmp">
    <p>chance</p>

    <i class="drawing fa fa-question"></i>
    <div v-if="tile.players" class="players">
      <div class="player" v-for="player in tile.players" :key="player">🙄</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tile: Object,
  },
  name: 'chance-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
