<template>
  <section class="chance-cmp" :title="'Chance'">
    <p>chance</p>
    <i class="drawing fa fa-question"></i>
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
  name: 'chance-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
  components: {},
}
</script>

<style></style>
