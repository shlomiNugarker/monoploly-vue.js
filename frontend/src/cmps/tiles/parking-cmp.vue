<template>
  <section class="parking-cmp" title="Parking">
    <div class="containerr">
      <span class="free">Free</span>
      <i class="drawing fa fa-car"></i>
      <span class="parking">Parking</span>
    </div>
    <div v-if="tile.players.length" class="players">
      <div class="player" v-for="player in tile.players" :key="player">
        <font-awesome-icon
          :style="{ color: player.colorToken }"
          class="token-player"
          icon="chess-pawn"
        />
      </div>
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
