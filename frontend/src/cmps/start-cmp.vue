<template>
  <section class="start-cmp">
    <div class="conainer">
      <div class="title">
        {{ tile.name }}
      </div>
      <div v-if="tile.players" class="players">
        <div class="player" v-for="player in tile.players" :key="player">
          🙄
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
