<template>
  <section class="start-cmp">
    <div class="conainer">
      <div class="title" :title="tile.name">
        <p>
          {{ tile.name }}
        </p>
      </div>
      <!-- <font-awesome-icon icon="right-long" /> -->

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
  </section>
</template>

<script>
export default {
  props: {
    tile: Object,
  },
  name: 'start-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
