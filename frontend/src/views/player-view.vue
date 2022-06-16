<template>
  <section class="player-view">
    <div class="go-back" @click="closeDetails">x</div>
    <div class="containerr" v-if="players">
      <div class="player-name">
        <p>name: {{ player.name }}</p>
      </div>
      <div class="balance">
        <p>balance: {{ player.balance }}</p>
      </div>
      <div class="cards-player">
        <p>propertyCards:</p>
        <div v-for="card in player.propertyCards" :key="card._id">
          {{ card.title }}
        </div>
        <div class="cards-container">
          <!-- <component
            :is="cmp"
            :class="'tile tile-' + idx"
            v-for="(cmp, idx) in cmpsOrder"
            :key="idx"
            :tile="tiles[idx]"
          /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import propertyCard from '../cmps/cards/property-card.vue'
import utilityCard from '../cmps/cards/utility-card.vue'
import readingRailroadCard from '../cmps/cards/reading-railroad-card.vue'
import communityChestCard from '../cmps/cards/community-chest-card.vue'
import chanceCards from '../cmps/cards/chance-card.vue'
export default {
  name: 'player-view',
  data() {
    return {
      player: null,
      // players: null,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  created() {
    this.getPlayer()
  },
  methods: {
    closeDetails() {
      this.$router.push('/board/')
    },
    getPlayer() {
      var id = this.$route.params.playerId
      var idx = this.board.players.findIndex((player) => player._id === id)
      this.player = this.players[idx]
    },
  },
  components: {
    propertyCard,
    utilityCard,
    readingRailroadCard,
    communityChestCard,
    chanceCards,
  },
  watch: {
    '$route.params.playerId'() {
      this.getPlayer()
    },
  },
}
</script>

<style></style>
