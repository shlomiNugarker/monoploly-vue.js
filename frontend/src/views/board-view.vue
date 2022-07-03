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
          :tileIdx="idx"
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

      <updateMsgModal :updates="updates" v-if="updates.length" />

      <div>
        <div class="bg" v-if="currCard.type || msg">
          <modal
            :card="currCard"
            :msg="msg"
            @closePropertyModal="closePropertyModal"
            @buyPropertyCard="buyPropertyCard"
            @closeModal="closeModal"
            @buyRailroadCard="buyRailroadCard"
            @buyUtilityCard="buyUtilityCard"
            @doChanceTask="doChanceTask"
            @doCommunityTask="doCommunityTask"
            @buyHouse="buyHouse"
            @tryDouble="tryDouble"
            @payToJail="payToJail"
          />
        </div>
      </div>
      <router-view></router-view>
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
import updateMsgModal from '../cmps/modals/update-msg-modal.vue'
import { utilService } from '../services/util.service'
export default {
  name: 'board-view',
  data() {
    return {
      updates: [],
      msg: '',
      turn: null,
      currCard: {},
      isNextPayByDice: {
        isTrue: false,
        payTo: null,
      },
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
    playerIdx() {
      return this.$store.getters.playerIdx
    },
    currDice() {
      return this.$store.getters.currDice
    },
    doubleCount() {
      return this.$store.getters.doubleCount
    },
  },
  async created() {
    const boardId = this.$route.params.boardId
    await this.$store.dispatch({ type: 'getBoardById', boardId })
    await this.$store.dispatch({
      type: 'doSteps',
      newPosition: 10,
    })
    const updateMsg = `${this.currPLayer.name} is playing now`
    this.showUpdate(updateMsg)
  },

  methods: {
    tryDouble() {
      console.log('try double')

      this.closeModal()
      // this.throwDice()
    },
    async payToJail() {
      console.log('pay to jail')
      await this.$store.dispatch({
        type: 'payMoney',
        playerIdx: this.playerIdx,
        amount: 100,
      })
      await this.$store.dispatch({
        type: 'getOutOfJail',
        playerIdx: this.playerIdx,
      })
      this.showUpdate('you just get out from jail, throw dice !')
      this.closeModal()
    },
    showUpdate(update, delay = 7000) {
      this.updates.push(update)
      setTimeout(() => this.updates.shift(), delay)
    },
    showMsg(msg, delay = 7000) {
      this.msg = msg
      setTimeout(() => (this.msg = null), delay)
    },
    async swichToNextPlayer() {
      await this.$store.dispatch({
        type: 'swichToNextPlayer',
      })
      if (this.currPLayer.isInJail) {
        this.showUpdate(
          `${this.currPLayer.name}, you are in jail, try to get dubble or pay $100`
        )
        this.currCard.type = 'jail'
      }
    },
    async throwDice() {
      let isDubble = false
      if (this.currDice) {
        isDubble = this.currDice[0] === this.currDice[1]
        if (!isDubble) {
          if (this.currPLayer.isInJail) this.showUpdate('Maybe next time')
          return
        }
      }
      const dice = [
        utilService.getRandomInt(1, 7),
        utilService.getRandomInt(1, 7),
      ]
      // var dice = [1, 1]

      await this.$store.dispatch({ type: 'throwDice', dice })
      if (this.isNextPayByDice?.isTrue) {
        this.payByDice()
        return
      }
      const isThreeTimesDouble = this.checkDubbleCount()
      if (isThreeTimesDouble) {
        this.goToJail()
        return
      }
      this.doSteps()
    },
    checkDubbleCount() {
      if (this.currDice[0] === this.currDice[1]) {
        if (this.doubleCount >= 2) {
          this.showUpdate('3 times double.. you are going to jail')
          return true
        }
        this.showUpdate('Double ! play again.')
        return false
      }
    },
    async payByDice(times = 10) {
      let payTo = this.isNextPayByDice.payTo
      await this.$store.dispatch({ type: 'payByDice', times, payTo })
      this.isNextPayByDice = {}
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
    },
    async buyRailroadCard(cardId) {
      await this.$store.dispatch({
        type: 'buyRailroadCard',
        cardId,
      })
      this.currCard = {}
    },
    async buyUtilityCard(cardId) {
      await this.$store.dispatch({
        type: 'buyUtilityCard',
        cardId,
      })
      this.currCard = {}
    },
    closePropertyModal() {
      this.currCard = {}
    },
    openCommunityModal() {
      const length = this.cards.communityChestCards.length
      let cardIdx = utilService.getRandomInt(0, length)
      // let cardIdx = 13
      this.currCard = this.cards.communityChestCards[cardIdx]
    },
    openChanceModal() {
      const length = this.cards.chanceCards.length
      let cardIdx = utilService.getRandomInt(0, length)
      // let cardIdx = 0
      this.currCard = this.cards.chanceCards[cardIdx]
    },
    async doCommunityTask() {
      const playerPosBefore = this.currPLayer.position
      await this.$store.dispatch({
        type: 'doCommunityTask',
        card: this.currCard,
      })
      this.currCard = {}
      const playerPosAfter = this.currPLayer.position
      const isPlayerMoved = playerPosAfter !== playerPosBefore
      if (isPlayerMoved) this.checkCondition()
    },
    async doChanceTask() {
      const playerPosBefore = this.currPLayer.position
      await this.$store.dispatch({
        type: 'doChanceTask',
        card: this.currCard,
      })
      this.currCard = {}
      const playerPosAfter = this.currPLayer.position
      const isPlayerMoved = playerPosAfter !== playerPosBefore
      if (isPlayerMoved) this.checkCondition()
    },
    openRailroadModal(name) {
      const cardIdx = this.cards.railroadsCards.findIndex((card) => {
        console.log(card.title + '===' + name)
        return card.title === name
      })
      this.currCard = this.cards.railroadsCards[cardIdx]
    },
    openUtilityModal(name) {
      const cardIdx = this.cards.utilitiesCards.findIndex(
        (card) => card.name === name
      )
      this.currCard = this.cards.utilitiesCards[cardIdx]
    },
    openPropertyModal(name) {
      const cardIdx = this.cards.propertyCards.findIndex(
        (card) => card.title === name
      )
      this.currCard = this.cards.propertyCards[cardIdx]
    },
    closeModal() {
      this.currCard = {}
      this.msg = ''
    },
    async payTax(taxType) {
      let pay
      if (taxType === 'Income tax') pay = 200
      else if (taxType === 'Luxury Tax') pay = 75
      else if (taxType === 'Water  Works') pay = 100
      const msg = `${taxType}, pay ${pay}$`

      this.msg = msg
      await this.$store.dispatch({
        type: 'payTax',
        pay,
      })
    },
    async collectMoney() {
      await this.$store.dispatch({
        type: 'collectMoney',
        playerIdx: this.playerIdx,
        amount: 200,
      })
    },
    async goToJail() {
      console.log(this.playerIdx)
      await this.$store.dispatch({
        type: 'goToJail',
        playerIdx: this.playerIdx,
      })
    },
    checkCondition() {
      let currTile = this.board.tiles[this.currPLayer.position]
      const isTileFree = !currTile.owner || !Object.keys(currTile.owner).length
      const isMyTail = currTile.owner?._id === this.currPLayer._id
      if (isTileFree) {
        switch (currTile.type) {
          case 'go':
            console.log('go / swich')
            // this.collectMoney()
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
            this.showUpdate('You are going to jail..')
            this.goToJail()
            break
          case 'visit':
            console.log('visit / swich')
            break
          case 'railroad':
            console.log('Railroad / swich')
            this.openRailroadModal(currTile.name)
            break
          case 'utility':
            console.log('utility / swich')
            this.openUtilityModal()

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
            this.$alert('Condition not found')
        }
      } else if (isMyTail) {
        if (currTile.type === 'city') {
          // this.showUpdate('Your city')
          const hasAllCities = this.hasAllCities()
          const isCanBuyMore = this.isAllowedToBuyHouse()
          if (!hasAllCities) {
            // this.showUpdate('')

            if (!isCanBuyMore) this.showUpdate('')
          }
          if (hasAllCities & isCanBuyMore) this.openBuyHouseModal(currTile.name)
        }
      } else {
        // TILE IS NOT FREE..
        const isNextPayByDice = this.board.currPLayer.isNextPayByDice?.isTrue
        if (isNextPayByDice) {
          this.isNextPayByDice.isTrue = true //maybe save this on state ??
          this.isNextPayByDice.payTo = currTile.owner
          // this.$alert('Throw dice for pay !')
          this.showUpdate('Throw dice for pay !')
        } else if (
          currTile.type === 'city' ||
          currTile.type === 'railroad' ||
          currTile.type === 'utility'
        ) {
          console.log('payRent')
          this.payRent(currTile)
        }
      }
    },
    async payRent(currTile) {
      const amount = await this.$store.dispatch({
        type: 'payRent',
        currTile,
      })
      const msg = `${this.currPLayer.name} pay $${amount} rent, to ${currTile.owner.name}`
      this.showUpdate(msg, 7000)
    },
    openBuyHouseModal(name) {
      const cardIdx = this.board.players[
        this.playerIdx
      ].propertyCards.findIndex((card) => card.title === name)
      this.currCard = {
        ...this.board.players[this.playerIdx].propertyCards[cardIdx],
      }
      this.currCard.type = 'buyHouse'
    },
    async buyHouse(cardId) {
      await this.$store.dispatch({
        type: 'buyHouse',
        cardId,
        playerIdx: this.playerIdx,
      })
      this.currCard = {}
    },
    hasAllCities() {
      let currTile = this.board.tiles[this.currPLayer.position]
      const playerId = this.board.currPLayer._id
      const playerIdx = this.board.players.findIndex(
        (player) => player._id === playerId
      )
      const currCard =
        this.board.players[playerIdx].propertyCards.find(
          (card) => card.title.toLowerCase() === currTile.name.toLowerCase()
        ) || ''
      const cardsInCity =
        this.board.players[playerIdx].propertyCards.filter(
          (card) => card.color === currCard.color
        ) || ' '
      return cardsInCity.length === currCard.quantity
    },
    isAllowedToBuyHouse() {
      let currTile = this.board.tiles[this.currPLayer.position]
      const playerId = this.board.currPLayer._id
      const playerIdx = this.board.players.findIndex(
        (player) => player._id === playerId
      )
      const currCard =
        this.board.players[playerIdx].propertyCards.find(
          (card) => card.title.toLowerCase() === currTile.name.toLowerCase()
        ) || ''
      const cardsInCity =
        this.board.players[playerIdx].propertyCards.filter(
          (card) => card.color === currCard.color
        ) || ' '

      const otherCardsInCity = cardsInCity.filter(
        (card) => card._id !== currCard._id
      )

      const isAllowed = otherCardsInCity.every((card) => {
        return card.houses >= currCard.houses
      })
      return isAllowed
    },
  },
  watch: {
    '$route.params.boardId'() {
      const boardId = this.$route.params.boardId
      if (!boardId) return
      this.$store.dispatch({ type: 'getBoardById', boardId })
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
    updateMsgModal,
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
