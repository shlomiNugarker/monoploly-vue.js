<template>
  <section class="electric-cmp">
    <div>
      <p>Electric company</p>
      <font-awesome-icon class="electric-logo" icon="bolt-lightning" />
    </div>
    <p>{{ tile.price }}$</p>

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
  name: 'electric-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
