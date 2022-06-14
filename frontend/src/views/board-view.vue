<template>
  <section class="board-view">
    <div class="container">
      <component
        :is="cmp"
        :class="'tile tile-' + idx"
        v-for="(cmp, idx) in cmpsOrder"
        :key="idx"
        :tile="tiles[idx]"
      />
      <div class="center">
        <div>Turn: {{ turn.name }}</div>
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
import { utilService } from '../services/util.service'
export default {
  name: 'board-view',
  data() {
    return {
      turn: null,
      currDice: null,
      cmpsOrder: [
        'startCmp', // 0
        'tileCmp',
        'communityCmp',
        'tileCmp',
        'incomeCmp',
        'railroadCmp', // 5
        'tileCmp',
        'chanceCmp',
        'tileCmp',
        'tileCmp',
        'jailCmp', // 10
        'tileCmp',
        'electricCmp',
        'tileCmp',
        'tileCmp',
        'railroadCmp', //15
        'tileCmp',
        'communityCmp',
        'tileCmp',
        'tileCmp',
        'parkingCmp', // 20
        'tileCmp',
        'chanceCmp',
        'tileCmp',
        'tileCmp',
        'railroadCmp', // 25
        'tileCmp',
        'tileCmp',
        'waterWorkCmp',
        'tileCmp',
        'sendToJailCmp', // 30
        'tileCmp',
        'tileCmp',
        'communityCmp',
        'tileCmp',
        'railroadCmp', //35
        'chanceCmp',
        'tileCmp',
        'luxuryTaxCmp',
        'tileCmp',
      ],
      players: [
        {
          _id: 'p100',
          name: 'Shlomi',
          position: 0,
          propertyCards: [],
          balance: 1000,
        },
        {
          _id: 'p101',
          name: 'Eden',
          position: 0,
          propertyCards: [],
          balance: 1000,
        },
      ],

      tiles: [
        {
          name: 'Go',
          players: [],
          owner: null,
          price: 60,
          type: 'go',
        },
        {
          name: 'Mediterranean Avenue',
          players: [],
          owner: null,
          color: '#562e22',
          price: 60,
          type: 'city',
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
          color: '',
          type: 'CommunityChest',
        },
        {
          name: 'Baltic Avenue',
          players: [],
          owner: null,
          color: '#562e22',
          price: 60,
          type: 'city',
        },
        {
          name: 'Income tax',
          players: [],
          owner: null,
          color: '',
          price: 200,
          type: 'tax',
        },
        {
          // 5
          name: 'Reading Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
          type: 'company',
        },
        {
          name: 'Oriental Avenue',
          players: [],
          owner: null,
          color: '#95b8cb',
          price: 100,
          type: 'city',
        },
        {
          name: 'Chance',
          players: [],
          owner: null,
          type: 'chance',
        },
        {
          name: 'Vermont Avenue',
          players: [],
          owner: null,
          color: '#95b8cb',
          price: 100,
          type: 'city',
        },
        {
          name: 'Connecticut Avenue',
          players: [],
          owner: null,
          color: '#95b8cb',
          price: 120,
          type: 'city',
        },
        {
          // 10
          name: 'jail',
          players: [],
          owner: null,
          type: 'visit',
        },
        {
          name: 'St. Charles Place',
          players: [],
          owner: null,
          color: '#cb5382',
          price: 140,
          type: 'city',
        },
        {
          name: 'Electric Company',
          players: [],
          owner: null,
          color: '',
          price: 140,
          type: 'company',
        },
        {
          name: 'States Avenue',
          players: [],
          owner: null,
          color: '#cb5382',
          price: 140,
          type: 'city',
        },
        {
          name: 'Virginia Avenue',
          players: [],
          owner: null,
          color: '#cb5382',
          price: 160,
          type: 'city',
        },
        {
          // 15
          name: 'Pennsylvania Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
          type: 'company',
        },
        {
          name: 'St. James Place',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 100,
          type: 'city',
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
          type: 'CommunityChest',
        },
        {
          name: 'Tennessee Avenue',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 180,
          type: 'city',
        },
        {
          name: 'New York Avenue',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 200,
          type: 'city',
        },

        {
          // 20
          name: 'Parking',
          players: [],
          owner: null,
          color: '',
          type: 'parking',
        },
        {
          name: 'Kentucky Avenue',
          players: [],
          owner: null,
          color: '#cf3b30',
          price: 220,
          type: 'city',
        },
        {
          name: 'Chance',
          players: [],
          owner: null,
          color: '',
          type: 'chance',
        },
        {
          name: 'Indiana Avenue',
          players: [],
          owner: null,
          color: '#cf3b30',
          price: 220,
          type: 'city',
        },
        {
          name: 'Illinois Avenue',
          players: [],
          owner: null,
          color: '#cf3b30',
          price: 240,
          type: 'city',
        },
        {
          // 25
          name: 'B. & O. Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
          type: 'company',
        },
        {
          name: 'Atlantic Avenue',
          players: [],
          owner: null,
          color: '#d3c11b',
          price: 260,
          type: 'city',
        },
        {
          name: 'Ventnor Avenue',
          players: [],
          owner: null,
          color: '#d3c11b',
          price: 260,
          type: 'city',
        },
        {
          name: 'Water  Works',
          players: [],
          owner: null,
          color: '',
          price: 100,
          type: 'company',
        },

        {
          name: 'Marvin Gardens',
          players: [],
          owner: null,
          color: '#d3c11b',
          price: 280,
          type: 'city',
        },
        {
          // 30
          name: 'Send To Jail',
          players: [],
          owner: null,
          color: '',
          type: 'jail',
        },
        {
          name: 'Pacific Avenue',
          players: [],
          owner: null,
          color: '#0ab842',
          price: 300,
          type: 'city',
        },
        {
          name: 'North Carolina Avenue',
          players: [],
          owner: null,
          color: '#0ab842',
          price: 300,
          type: 'city',
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
          color: '',
          type: 'CommunityChest',
        },
        {
          name: 'Pennsylvania Avenue',
          players: [],
          owner: null,
          color: '#0ab842',
          price: 320,
          type: 'city',
        },
        {
          // 35
          name: 'Short Line',
          players: [],
          owner: null,
          color: '',
          price: 200,
          type: 'company',
        },
        {
          name: 'Chance',
          players: [],
          owner: null,
          color: '',
          type: 'chance',
        },
        {
          name: 'Park Place',
          players: [],
          owner: null,
          color: '#2863ad',
          price: 350,
          type: 'city',
        },
        {
          name: 'Luxury Tax',
          players: [],
          owner: null,
          color: '',
          price: 75,
          type: 'tax',
        },
        {
          // 39
          name: 'Boardwalk',
          players: [],
          owner: null,
          color: '#2863ad',
          price: 400,
          type: 'city',
        },
      ],
    }
  },
  computed: {},
  created() {
    this.tiles[0].players = this.players
    this.turn = this.players[0]
  },
  methods: {
    takeCard() {
      // this.$alert('card')
    },
    throwDice() {
      var dice = [
        utilService.getRandomInt(1, 7),
        utilService.getRandomInt(1, 7),
      ]
      this.currDice = dice

      this.doSteps()
    },
    doSteps() {
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

      console.log(this.tiles[newPosition])
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
  },
}
</script>

<style>
.cards {
  width: 90%;

  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
