<template>
  <section class="railroad-cmp">
    <div class="tz">
      <p>Reading railroad</p>
      <i class="drawing fa fa-subway"></i>
    </div>
    <div class="price">{{ tile.price }}$</div>
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
  name: 'railroad-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
