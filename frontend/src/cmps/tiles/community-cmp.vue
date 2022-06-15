<template>
  <section class="community-cmp">
    <p>community chest</p>

    <i class="drawing fa fa-cube"></i>
    <div v-if="tile.players" class="players">
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
  name: 'community-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
