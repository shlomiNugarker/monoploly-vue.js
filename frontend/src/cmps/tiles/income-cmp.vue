<template>
  <section class="income-cmp" :title="'Income-tax'">
    <p>Income tax</p>
    <p>PAY 10%</p>
    <p>OR $200</p>
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
  name: 'income-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
