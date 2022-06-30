<template>
  <section class="player-view">
    <div class="view-header">
      <div class="go-back" @click="closeDetails">x</div>
      <div class="player-name">
        <p>name: {{ player.name }}</p>
      </div>
      <div class="balance">
        <p>balance: {{ player.balance }}</p>
      </div>
    </div>
    <div class="containerr" v-if="player">
      <div class="cards-player">
        <propertyCard
          v-for="card in player.propertyCards"
          :key="card._id"
          :card="card"
        />

        <readingRailroadCard
          v-for="card in player.railroadsCards"
          :key="card._id"
          :card="card"
        />

        <utilityCard
          v-for="card in player.utilitiesCards"
          :key="card._id"
          :card="card"
        />

        <chanceCards
          v-for="card in player.chanceCards"
          :key="card._id"
          :card="card"
        />

        <communityChestCard
          v-for="card in player.communityChestCards"
          :key="card._id"
          :card="card"
        />
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
      // player: null,
      playerIdx: null,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    player() {
      return this.$store.getters.board.players[this.playerIdx]
    },
  },
  created() {
    this.getPlayer()
  },
  methods: {
    closeDetails() {
      this.$router.push('/board/' + this.board._id)
    },
    getPlayer() {
      var id = this.$route.params.playerId
      this.playerIdx = this.board.players.findIndex(
        (player) => player._id === id
      )
      // this.player = this.board.players[playerIdx]
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
