<template>
  <section class="water-work-cmp">
    <div class="containerr">
      <span class="waterwoks"> Waterworks </span>
      <i class="drawing fa fa-tint"></i>
    </div>
    <p class="price">{{ tile.price }}$</p>

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
  name: 'water-work-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
