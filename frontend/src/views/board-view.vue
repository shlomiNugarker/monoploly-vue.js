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
    // this.turn = this.players[0]
    // const boardId = this.$route.params.boardId
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

      // this.doSteps()
    },
    doSteps() {
      this.$store.dispatch({ type: 'doSteps', currDice: [...this.currDice] })

      /////////////////////////////////////////////////
      var playerToStep = { ...this.turn }

      // Remove player from last pos:
      this.tiles[playerToStep.position].players = this.tiles[
        playerToStep.position
      ].players.filter((player) => playerToStep._id !== player._id)

      let newPosition =
        playerToStep.position + this.currDice[0] + this.currDice[1]

      if (newPosition > 39) newPosition -= 40

      // place player in new pos:
      this.tiles[newPosition].players.push(playerToStep)
      var idx = this.players.findIndex(
        (player) => player._id === playerToStep._id
      )
      this.players[idx].position = newPosition
      // this.$alert(
      //   'Do you want to buy ' + `${this.tiles[newPosition].name}`
      // ).then(() => {
      //   console.log('than')
      // })

      this.swichToNextPlayer()
    },
    swichToNextPlayer() {
      var idx = this.players.findIndex((player) => player._id === this.turn._id)
      if (idx + 1 < this.players.length) {
        this.turn = this.players[idx + 1]
      } else {
        this.turn = this.players[0]
      }
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
