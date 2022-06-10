<template>
  <section class="income-cmp">
    <p>Income tax</p>
    <p>PAY 10%</p>
    <p>OR $200</p>
    <div v-if="tile.players" class="players">
      <div class="player" v-for="player in tile.players" :key="player">🙄</div>
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
