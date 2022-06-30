<template>
  <section class="send-to-jail-cmp" title="Go to jail">
    <div class="containerr">
      <span>Go to</span>
      <i class="drawing fa fa-gavel"></i>
      <span>Jail</span>
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
  name: 'send-to-jail-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
