<template>
  <section class="login-view">
    <div class="container">
      <component
        :is="cmp"
        :class="'tile tile-' + idx"
        v-for="(cmp, idx) in cmpsOrder"
        :key="idx"
        :tile="tiles[idx]"
      >
      </component>

      <div class="center">
        <div>Turn: {{ turn.name }}</div>
      </div>
      <div class="chance" @click="takeCard">Chance</div>
      <div class="communiyt">Community chest</div>
      <div class="logo">Monopoly</div>
      <!-- <div class="dice" @click="throwDice">{{ currDice }}</div> -->
      <diceCmp :currDice="currDice" @throwDice="throwDice" />
    </div>
  </section>
</template>

<script>
import startCmp from '../cmps/start-cmp.vue'
import tileCmp from '../cmps/tile-cmp.vue'
import communityCmp from '../cmps/community-cmp.vue'
import incomeCmp from '../cmps/income-cmp.vue'
import railroadCmp from '../cmps/railroad-cmp.vue'
import chanceCmp from '../cmps/chancee-cmp.vue'
import jailCmp from '../cmps/jail-cmp.vue'
import electricCmp from '../cmps/electric-cmp.vue'
import parkingCmp from '../cmps/parking-cmp.vue'
import waterWorkCmp from '../cmps/water-work-cmp.vue'
import sendToJailCmp from '../cmps/send-to-jail-cmp.vue'
import luxuryTaxCmp from '../cmps/luxury-tax-cmp.vue'
import diceCmp from '../cmps/dice-cmp.vue'
import { utilService } from '../services/util.service'
export default {
  name: 'board-view',
  data() {
    return {
      turn: null,
      // currDice: [0, 0],
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
        },
        {
          _id: 'p101',
          name: 'Eden',
          position: 0,
        },
      ],
      tiles: [
        {
          name: 'Go',
          players: [],
          owner: null,
          price: 60,
        },
        {
          name: 'Tel-Aviv',
          players: [],
          owner: null,
          color: '#c677df',
          price: 60,
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Tel-Aviv',
          players: [],
          owner: null,
          color: '#c677df',
          price: 70,
        },
        {
          name: 'Income tax',
          players: [],
          owner: null,
          color: '',
          price: 200,
        },
        {
          name: 'Reading Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
        },
        {
          name: 'Eilat',
          players: [],
          owner: null,
          color: '#d7ebff',
          price: 100,
        },
        {
          name: 'Chance',
          players: [],
          owner: null,
        },
        {
          name: 'Eilat',
          players: [],
          owner: null,
          color: '#d7ebff',
          price: 100,
        },
        {
          name: 'Eilat',
          players: [],
          owner: null,
          color: '#d7ebff',
          price: 120,
        },
        {
          name: 'jail',
          players: [],
          owner: null,
        },
        {
          name: 'Haifa',
          players: [],
          owner: null,
          color: '#d700be',
          price: 140,
        },
        {
          name: 'Electric Company',
          players: [],
          owner: null,
          color: '',
          price: 140,
        },
        {
          name: 'Haifa',
          players: [],
          owner: null,
          color: '#d700be',
          price: 140,
        },
        {
          name: 'Haifa',
          players: [],
          owner: null,
          color: '#d700be',
          price: 160,
        },
        {
          name: 'Reading Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
        },
        {
          name: 'Afula',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 100,
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
        },
        {
          name: 'Afula',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 90,
        },
        {
          name: 'Afula',
          players: [],
          owner: null,
          color: '#ffa600',
          price: 80,
        },

        {
          name: 'Parking',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Ashkelon',
          players: [],
          owner: null,
          color: '#ff0000',
          price: 70,
        },
        {
          name: 'Chance',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Ashkelon',
          players: [],
          owner: null,
          color: '#ff0000',
          price: 80,
        },
        {
          name: 'Ashkelon',
          players: [],
          owner: null,
          color: '#ff0000',
          price: 100,
        },
        {
          name: 'Reading Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
        },
        {
          name: 'Jerusalem',
          players: [],
          owner: null,
          color: '#ffff00',
          price: 100,
        },
        {
          name: 'Jerusalem',
          players: [],
          owner: null,
          color: '#ffff00',
          price: 120,
        },
        {
          name: 'Water Works',
          players: [],
          owner: null,
          color: '',
          price: 100,
        },

        {
          name: 'Jerusalem',
          players: [],
          owner: null,
          color: '#ffff00',
          price: 120,
        },
        {
          name: 'Send To Jail',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Ramat-Gan',
          players: [],
          owner: null,
          color: '#00e700',
          price: 70,
        },
        {
          name: 'Ramat-Gan',
          players: [],
          owner: null,
          color: '#00e700',
          price: 90,
        },
        {
          name: 'Community chest',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Ramat-Gan',
          players: [],
          owner: null,
          color: '#00e700',
          price: 100,
        },
        {
          name: 'Reading Railroad',
          players: [],
          owner: null,
          color: '',
          price: 200,
        },
        {
          name: 'Chanse',
          players: [],
          owner: null,
          color: '',
        },
        {
          name: 'Hazor',
          players: [],
          owner: null,
          color: '#2861be',
        },
        {
          name: 'Luxury Tax',
          players: [],
          owner: null,
          color: '',
          price: 75,
        },
        {
          name: 'Hazor',
          players: [],
          owner: null,
          color: '#2861be',
          price: 120,
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

      // Remove player from last pos
      this.tiles[playerToStep.position].players = this.tiles[
        playerToStep.position
      ].players.filter((player) => playerToStep._id !== player._id)

      let newPosition =
        playerToStep.position + this.currDice[0] + this.currDice[1]

      if (newPosition > 39) newPosition -= 40

      this.tiles[newPosition].players.push(playerToStep)
      var idx = this.players.findIndex(
        (player) => player._id === playerToStep._id
      )
      this.players[idx].position = newPosition

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
  },
}
</script>

<style></style>
