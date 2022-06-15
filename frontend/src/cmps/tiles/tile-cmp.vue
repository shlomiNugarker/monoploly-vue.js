<template>
  <section class="tile-cmp">
    <div class="conainer">
      <div>
        <div
          class="color-bar"
          :style="{ 'background-color': tile.color }"
        ></div>
        <p>{{ tile.name }}</p>
        <div v-if="tile.players.length" class="players">
          <div class="player" v-for="player in tile.players" :key="player">
            <font-awesome-icon
              :style="{ color: player.colorToken }"
              class="token-player"
              icon="chess-pawn"
            />
          </div>
        </div>
      </div>

      <div class="price">{{ tile.price }}$</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tile: Object,
  },
  name: 'tile-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
