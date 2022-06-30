<template>
  <section class="railroad-cmp" :title="tile.name">
    <div class="tz">
      <p>{{ tile.name }}</p>
      <i class="drawing fa fa-subway"></i>
    </div>
    <div class="price">{{ tile.price }}$</div>
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
  name: 'railroad-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
