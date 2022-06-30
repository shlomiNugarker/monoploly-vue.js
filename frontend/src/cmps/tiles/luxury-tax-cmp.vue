<template>
  <section class="luxury-tax-cmp" :title="'Luxury-tax'">
    <div class="containerr">
      <span class="luxury">Luxury</span>
      <span class="tax">Tax</span>
      <div class="logoo">f</div>
    </div>
    <div class="footer">
      <p>Pay</p>
      <p>{{ tile.price }}$</p>
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
  name: 'luxury-tax-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
