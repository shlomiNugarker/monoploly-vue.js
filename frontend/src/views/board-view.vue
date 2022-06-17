<template>
  <section class="board-view" v-if="board">
    <div class="container">
      <component
        :is="cmp"
        :class="'tile tile-' + idx"
        v-for="(cmp, idx) in board.cmpsOrder"
        :key="idx"
        :tile="board.tiles[idx]"
      />

      <div class="center">
        <div>Turn: turn.name</div>
      </div>

      <div class="chance" @click="takeCard">
        <div class="cards-chance">
          <p>Chance</p>
        </div>
      </div>

      <div class="communiyt">
        <div class="cards-community">
          <p>Community chest</p>
        </div>
      </div>

      <div class="logo">
        <img src="../styles/icon/Monopoly-Logo.svg" alt="" />
      </div>

      <diceCmp :currDice="currDice" @throwDice="throwDice" />
    </div>

    <playersListCmp :players="board.players" />
    {{}}
    <router-view></router-view>
  </section>
</template>

<script>
import startCmp from '../cmps/tiles/start-cmp.vue'
import tileCmp from '../cmps/tiles/tile-cmp.vue'
import communityCmp from '../cmps/tiles/community-cmp.vue'
import incomeCmp from '../cmps/tiles/income-cmp.vue'
import railroadCmp from '../cmps/tiles/railroad-cmp.vue'
import chanceCmp from '../cmps/tiles/chancee-cmp.vue'
import jailCmp from '../cmps/tiles/jail-cmp.vue'
import electricCmp from '../cmps/tiles/electric-cmp.vue'
import parkingCmp from '../cmps/tiles/parking-cmp.vue'
import waterWorkCmp from '../cmps/tiles/water-work-cmp.vue'
import sendToJailCmp from '../cmps/tiles/send-to-jail-cmp.vue'
import luxuryTaxCmp from '../cmps/tiles/luxury-tax-cmp.vue'
import diceCmp from '../cmps/tiles/dice-cmp.vue'
import propertyCard from '../cmps/cards/property-card.vue'
import utilityCard from '../cmps/cards/utility-card.vue'
import readingRailroadCard from '../cmps/cards/reading-railroad-card.vue'
import playersListCmp from '../cmps/players-list-cmp.vue'
import { utilService } from '../services/util.service'
export default {
  name: 'board-view',
  data() {
    return {
      turn: null,
      currDice: null,
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    players() {
      return this.$store.getters.players
    },
  },
  created() {
    const boardId = 'b101'
    this.$store.dispatch({ type: 'getBoardById', boardId })
    this.$store.dispatch({ type: 'setCurrPlayer' })
  },
  methods: {
    takeCard() {},
    throwDice() {
      var dice = [
        utilService.getRandomInt(1, 7),
        utilService.getRandomInt(1, 7),
      ]
      this.currDice = dice

      this.doSteps()
    },
    doSteps() {
      this.$store.dispatch({ type: 'doSteps', currDice: [...this.currDice] })
    },
  },
  components: {
    startCmp,
    tileCmp,
    communityCmp,
    incomeCmp,
    railroadCmp,
    chanceCmp,
    jailCmp,
    electricCmp,
    parkingCmp,
    waterWorkCmp,
    sendToJailCmp,
    luxuryTaxCmp,
    diceCmp,
    propertyCard,
    utilityCard,
    readingRailroadCard,
    playersListCmp,
  },
}
</script>

<style></style>
