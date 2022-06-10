<template>
  <section class="parking-cmp">
    <div class="containerr">
      <span class="free">Free</span>
      <i class="drawing fa fa-car"></i>
      <span class="parking">Parking</span>
    </div>
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
  name: 'parking-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
