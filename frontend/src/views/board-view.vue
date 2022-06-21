<template>
  <section>
    <section class="board-view" v-if="board">
      <div class="board-container">
        <component
          :is="cmp"
          :class="'tile tile-' + idx"
          v-for="(cmp, idx) in board.cmpsOrder"
          :key="idx"
          :tile="board.tiles[idx]"
        />

        <div class="center">
          <div>Turn: {{ currPLayer.name }}</div>
          <p @click="swichToNextPlayer">Pass the dice</p>
        </div>

        <div class="chance">
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

      <router-view></router-view>

      <div>
        <div class="bg" v-if="currCard.type">
          <modal
            :card="currCard"
            @closePropertyModal="closePropertyModal"
            @buyPropertyCard="buyPropertyCard"
            @closeModal="closeModal"
            @buyRailroadCard="buyRailroadCard"
            @doChanceTask="doChanceTask"
          />
        </div>
      </div>
    </section>
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
import modal from '../cmps/modals/modal-cmps.vue'
import { utilService } from '../services/util.service'
export default {
  name: 'board-view',
  data() {
    return {
      turn: null,
      currDice: null,
      currCard: {},
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    players() {
      return this.$store.getters.players
    },
    cards() {
      return this.$store.getters.cards
    },
    currPLayer() {
      return this.$store.getters.currPLayer
    },
  },
  created() {
    const boardId = 'b101'
    this.$store.dispatch({ type: 'getBoardById', boardId })
  },
  methods: {
    swichToNextPlayer() {
      this.currDice = null
      this.$store.dispatch({
        type: 'swichToNextPlayer',
      })
    },
    throwDice() {
      // var dice = [
      //   utilService.getRandomInt(1, 7),
      //   utilService.getRandomInt(1, 7),
      // ]
      var dice = [0, 4]
      this.currDice = dice

      this.doSteps()
    },
    async doSteps() {
      let newPosition =
        this.currPLayer.position + this.currDice[0] + this.currDice[1]
      if (newPosition > 39) newPosition -= 40

      await this.$store.dispatch({
        type: 'doSteps',
        newPosition,
      })
      this.checkCondition()
    },
    async buyPropertyCard(cardId) {
      await this.$store.dispatch({
        type: 'buyPropertyCard',
        cardId,
      })
      this.currCard = {}
      this.swichToNextPlayer()
    },
    async buyRailroadCard(cardId) {
      await this.$store.dispatch({
        type: 'buyRailroadCard',
        cardId,
      })
      this.currCard = {}
      this.swichToNextPlayer()
    },
    closePropertyModal() {
      this.currCard = {}
      this.swichToNextPlayer()
    },
    openCommunityModal() {
      const length = this.cards.communityChestCards.length

      let cardIdx = utilService.getRandomInt(0, length)
      this.currCard = this.cards.communityChestCards[cardIdx]
    },
    openChanceModal() {
      const length = this.cards.chanceCards.length
      // let cardIdx = utilService.getRandomInt(0, length)
      let cardIdx = 1
      this.currCard = this.cards.chanceCards[cardIdx]
    },
    async doChanceTask() {
      await this.$store.dispatch({
        type: 'doChanceTask',
        card: this.currCard,
      })
      this.closeModal()
    },
    openRailroadModal(name) {
      const cardIdx = this.cards.railroadsCards.findIndex(
        (card) => card.name === name
      )
      this.currCard = this.cards.railroadsCards[cardIdx]
    },
    openPropertyModal(name) {
      const cardIdx = this.cards.propertyCards.findIndex(
        (card) => card.title === name
      )
      this.currCard = this.cards.propertyCards[cardIdx]
    },
    closeModal() {
      this.currCard = {}
      this.swichToNextPlayer()
    },
    async payTax(taxType) {
      let pay = taxType === 'Income tax' ? 200 : 75
      if (taxType === 'Income tax') pay = 200
      else if (taxType === 'Luxury Tax') pay = 75
      else if (taxType === 'Water  Works') pay = 100
      const msg = `${taxType}, pay ${pay}$`

      this.currCard = {
        type: 'msg',
        msg,
      }
      await this.$store.dispatch({
        type: 'payTax',
        pay,
      })
    },
    checkCondition() {
      let currTile = this.board.tiles[this.currPLayer.position]
      if (!currTile.owner || !Object.keys(currTile.owner).length) {
        // FREE TILE..
        switch (currTile.type) {
          case 'go':
            console.log('go / swich')
            break
          case 'city':
            console.log('city / swich')
            this.openPropertyModal(currTile.name)

            break
          case 'chance':
            this.openChanceModal()
            break
          case 'jail':
            console.log('jail / swich')
            break
          case 'visit':
            console.log('visit / swich')
            this.swichToNextPlayer()
            break
          case 'company':
            console.log('company / swich')

            this.openRailroadModal()

            break
          case 'tax':
            console.log('tax / swich')
            this.payTax(currTile.name)
            break
          case 'communityChest':
            this.openCommunityModal()
            break
          case 'parking':
            console.log('parking / swich')
            break
          default:
          // some code
        }
      } else if (currTile.owner._id === this.currPLayer._id) {
        console.log('this is your city')
      } else {
        // NOT FREE..
        console.log('you need to pay rent..')
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
    modal,
    playersListCmp,
  },
}
</script>

<style>
.bg {
  inset: 0 0 0 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.422);
  /* z-index: 15; */
  /* cursor: pointer; */
  z-index: 15;
  /* pointer-events: none; */
}
</style>
