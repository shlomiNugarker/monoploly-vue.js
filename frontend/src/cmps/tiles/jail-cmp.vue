<template>
  <section class="jail-cmp" title="Jail / just visit">
    <span class="just">Just</span>
    <span class="visiting">Visiting</span>
    <div class="in-jail">
      <span class="in">In</span>
      <span class="jail">Jail</span>
      <div class="cage">
        <div class="line"></div>
        <div class="line-2"></div>
        <div class="line-3"></div>
      </div>
      <i class="person fa fa-frown-o"></i>
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
  name: 'jail-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
