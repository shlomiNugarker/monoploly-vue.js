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
          <!-- <cityModal
            v-if="isCityModalOpen"
            :card="currCard"
            @closeCityModal="closeCityModal"
            @buyCity="buyCity"
          />
          <communityChestModal
            v-if="isCommunityModalOpen"
            :card="currCard"
            @closeCommunityModal="closeCommunityModal"
          /> -->
          <modal
            :card="currCard"
            @closePropertyModal="closePropertyModal"
            @buyPropertyCard="buyPropertyCard"
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
// import communityChestModal from '../cmps/modals/community-chest-modal.vue'
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
    // setTimeout(() => {
    //   this.currCard = this.cards.propertyCards[5]
    // }, 200)
    // this.currCard = this.card.propertyCards[0]
    const boardId = 'b101'
    this.$store.dispatch({ type: 'getBoardById', boardId })
  },
  methods: {
    swichToNextPlayer() {
      this.$store
        .dispatch({
          type: 'swichToNextPlayer',
        })
        .then()
    },
    throwDice() {
      // var dice = [
      //   utilService.getRandomInt(1, 7),
      //   utilService.getRandomInt(1, 7),
      // ]
      var dice = [1, 1]
      this.currDice = dice

      this.doSteps()
    },
    doSteps() {
      this.$store
        .dispatch({ type: 'doSteps', currDice: [...this.currDice] })
        .then(() => {
          this.checkCondition()
        })
    },
    buyPropertyCard(cardId) {
      this.$store
        .dispatch({
          type: 'buyPropertyCard',
          cardId,
        })
        .then(() => {
          this.currCard = {}
          // this.swichToNextPlayer()
        })
    },
    closePropertyModal() {
      this.isCityModalOpen = false
      this.currCard = {}
      // this.swichToNextPlayer()
    },
    openPropertyModal(name) {
      const cardIdx = this.cards.propertyCards.findIndex(
        (card) => card.title === name
      )
      this.currCard = this.cards.propertyCards[cardIdx]
      console.log(this.currCard)
    },
    openCommunityModal() {
      console.log('openCommunityModal')
      let cardIdx = utilService.getRandomInt(0, 16)
      this.currCard = this.cards.communityChestCards[cardIdx]
      console.log(this.currCard)
      // this.isCommunityModalOpen = true
    },
    openChanceyModal() {
      console.log('openChanceyModal')
      this.isChanceModalOpen = true
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
            console.log('chance / swich')
            break
          case 'jail':
            console.log('jail / swich')
            break
          case 'visit':
            console.log('city / swich')
            this.swichToNextPlayer()
            break
          case 'company':
            console.log('company / swich')
            break
          case 'tax':
            console.log('tax / swich')
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
      } else {
        // NOT FREE..
        this.$alert('you need to pay..')
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
