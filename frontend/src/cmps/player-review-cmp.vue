<template>
  <section class="player-review-cmp">
    <div class="containerr" @click="openDetails(player._id)">
      <div>
        <p>
          {{ player.name }}
        </p>
      </div>
      <div>
        <p>{{ player.balance }}$</p>
      </div>
      <div>
        <font-awesome-icon
          :style="{ color: player.colorToken }"
          class="token-player-preview"
          icon="chess-pawn"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    player: Object,
  },
  name: 'player-review-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {
    openDetails(playerId) {
      console.log(playerId)
      this.$router.push('/board/' + playerId)
    },
  },
}
</script>

<style></style>
