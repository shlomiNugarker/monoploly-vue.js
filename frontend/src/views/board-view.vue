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
      <div class="chance" @click="takeCard">Chance</div>
      <div class="communiyt">Community chest</div>
      <div class="logo">
        <img src="../styles/icon/Monopoly-Logo.svg" alt="" />
      </div>
      <diceCmp :currDice="currDice" @throwDice="throwDice" />
    </div>
    <div v-for="card in cards" :key="card._id">
      <propertyCard :card="card"></propertyCard>
    </div>
    <waterworkCard :card="cards[0]"></waterworkCard>
    <electricCompanyCard></electricCompanyCard>
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
import propertyCard from '../cmps/cards/property-card.vue'
import waterworkCard from '../cmps/cards/waterwork-card.vue'
import electricCompanyCard from '../cmps/cards/electric-company-card.vue'
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
          // 0
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
      cards: [
        {
          _id: 'c-100',
          title: 'Mediterranean Avenue',
          color: '#562e22',
          price: 60,
          rent: 2,
          oneHouse: 10,
          twoHouses: 30,
          threeHouses: 90,
          fourHouses: 160,
          hotel: 250,
          mortgage: 30,
          houseCost: 50,
          hotelCost: 210,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-101',
          title: 'Baltic Avenue',
          color: '#562e22',
          price: 60,
          rent: 4,
          oneHouse: 20,
          twoHouses: 60,
          threeHouses: 180,
          fourHouses: 320,
          hotel: 450,
          mortgage: 30,
          houseCost: 50,
          hotelCost: 370,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-102',
          title: 'Reading Railroad',
          color: '',
          price: 200,
          rent: 25,
          ifTwoCards: 50,
          ifthreeCards: 100,
          ifFourCards: 200,
          mortgage: 100,
        },
        {
          _id: 'c-103',
          title: 'Oriental Avenue',
          color: '#95b8cb',
          price: 100,
          rent: 6,
          oneHouse: 30,
          twoHouses: 90,
          threeHouses: 270,
          fourHouses: 400,
          hotel: 550,
          mortgage: 50,
          houseCost: 50,
          hotelCost: 450,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-104',
          title: 'Vermont Avenue',
          color: '#95b8cb',
          price: 100,
          rent: 6,
          oneHouse: 30,
          twoHouses: 90,
          threeHouses: 270,
          fourHouses: 400,
          hotel: 550,
          mortgage: 50,
          houseCost: 50,
          hotelCost: 450,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-105',
          title: 'Connecticut Avenue',
          color: '#95b8cb',
          price: 120,
          rent: 8,
          oneHouse: 40,
          twoHouses: 100,
          threeHouses: 300,
          fourHouses: 450,
          hotel: 600,
          mortgage: 60,
          houseCost: 50,
          hotelCost: 500,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-106',
          title: 'St. Charles Place',
          color: '#cb5382',
          price: 140,
          rent: 10,
          oneHouse: 50,
          twoHouses: 150,
          threeHouses: 450,
          fourHouses: 625,
          hotel: 750,
          mortgage: 70,
          houseCost: 100,
          hotelCost: 725,
          hotelCostNotCalc: 50,
        },
        // {
        //   _id: 'c-107',
        //   title: 'Electric Company',
        //   price: 140,
        //   rent: '4 * Dice Roll',
        //   twoAreOwned: '10 * Dice Roll',
        //   mortgage: 75,
        // },

        {
          _id: 'c-108',
          title: 'States Avenue',
          color: '#cb5382',
          price: 140,
          rent: 10,
          oneHouse: 50,
          twoHouses: 150,
          threeHouses: 450,
          fourHouses: 625,
          hotel: 750,
          mortgage: 70,
          houseCost: 100,
          hotelCost: 725,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-109',
          title: 'Virginia Avenue',
          color: '#cb5382',
          price: 160,
          rent: 12,
          oneHouse: 60,
          twoHouses: 180,
          threeHouses: 500,
          fourHouses: 700,
          hotel: 900,
          mortgage: 80,
          houseCost: 100,
          hotelCost: 800,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-110',
          title: 'Pennsylvania Railroad',
          color: '',
          price: 200,
          rent: 25,
          ifTwoCards: 50,
          ifthreeCards: 100,
          ifFourCards: 200,
          mortgage: 100,
        },
        {
          _id: 'c-111',
          title: 'St. James Place',
          color: '#ffa600',
          price: 100,
          rent: 14,
          oneHouse: 70,
          twoHouses: 200,
          threeHouses: 550,
          fourHouses: 750,
          hotel: 950,
          mortgage: 90,
          houseCost: 100,
          hotelCost: 850,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-112',
          title: 'Tennessee Avenue',
          color: '#ffa600',
          price: 180,
          rent: 14,
          oneHouse: 70,
          twoHouses: 200,
          threeHouses: 550,
          fourHouses: 750,
          hotel: 950,
          mortgage: 90,
          houseCost: 100,
          hotelCost: 850,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-113',
          title: 'New York Avenue',
          color: '#ffa600',
          price: 200,
          rent: 16,
          oneHouse: 80,
          twoHouses: 220,
          threeHouses: 600,
          fourHouses: 800,
          hotel: 1000,
          mortgage: 100,
          houseCost: 100,
          hotelCost: 900,
          hotelCostNotCalc: 50,
        },
        {
          _id: 'c-114',
          title: 'Kentucky Avenue',
          color: '#cf3b30',
          price: 220,
          rent: 18,
          oneHouse: 90,
          twoHouses: 250,
          threeHouses: 700,
          fourHouses: 875,
          hotel: 1050,
          mortgage: 110,
          houseCost: 150,
          hotelCost: 1025,
          hotelCostNotCalc: 150,
        },
        {
          _id: 'c-115',
          title: 'Indiana Avenue',
          color: '#cf3b30',
          price: 220,
          rent: 18,
          oneHouse: 90,
          twoHouses: 250,
          threeHouses: 700,
          fourHouses: 875,
          hotel: 1050,
          mortgage: 110,
          houseCost: 150,
          hotelCost: 1025,
          hotelCostNotCalc: 150,
        },
        {
          _id: 'c-116',
          title: 'Illinois Avenue',
          color: '#cf3b30',
          price: 240,
          rent: 20,
          oneHouse: 100,
          twoHouses: 300,
          threeHouses: 750,
          fourHouses: 925,
          hotel: 1100,
          mortgage: 120,
          houseCost: 150,
          hotelCost: 1075,
          hotelCostNotCalc: 150,
        },
        {
          _id: 'c-117',
          title: 'B. & O. Railroad',
          color: '',
          price: 200,
          rent: 25,
          ifTwoCards: 50,
          ifthreeCards: 100,
          ifFourCards: 200,
          mortgage: 100,
        },
        {
          _id: 'c-118',
          title: 'Atlantic Avenue',
          color: '#d3c11b',
          price: 260,
          rent: 22,
          oneHouse: 110,
          twoHouses: 330,
          threeHouses: 800,
          fourHouses: 975,
          hotel: 1150,
          mortgage: 130,
          houseCost: 150,
          hotelCost: 1125,
          hotelCostNotCalc: 150,
        },
        {
          _id: 'c-119',
          title: 'Ventnor Avenue',
          color: '#d3c11b',
          price: 260,
          rent: 22,
          oneHouse: 110,
          twoHouses: 330,
          threeHouses: 800,
          fourHouses: 975,
          hotel: 1150,
          mortgage: 130,
          houseCost: 150,
          hotelCost: 1125,
          hotelCostNotCalc: 150,
        },
        // {
        //   _id: 'c-120',
        //   title: 'Waterworks',
        //   price: 100,
        //   rent: '4 * Dice Roll',
        //   twoAreOwned: '10 * Dice Roll',
        //   mortgage: 75,
        // },
        {
          _id: 'c-121',
          title: 'Marvin Gardens',
          color: '#d3c11b',
          price: 280,
          rent: 24,
          oneHouse: 120,
          twoHouses: 360,
          threeHouses: 850,
          fourHouses: 1025,
          hotel: 1200,
          mortgage: 140,
          houseCost: 150,
          hotelCost: 1175,
          hotelCostNotCalc: 150,
        },
        {
          _id: 'c-122',
          title: 'Pacific Avenue',
          color: '#0ab842',
          price: 300,
          rent: 26,
          oneHouse: 130,
          twoHouses: 390,
          threeHouses: 900,
          fourHouses: 1100,
          hotel: 1275,
          mortgage: 150,
          houseCost: 200,
          hotelCost: 1300,
          hotelCostNotCalc: 200,
        },
        {
          _id: 'c-123',
          title: 'North Carolina Avenue',
          color: '#0ab842',
          price: 300,
          rent: 26,
          oneHouse: 130,
          twoHouses: 390,
          threeHouses: 900,
          fourHouses: 1100,
          hotel: 1275,
          mortgage: 150,
          houseCost: 200,
          hotelCost: 1300,
          hotelCostNotCalc: 200,
        },
        {
          _id: 'c-124',
          title: 'Pennsylvania Avenue',
          color: '#0ab842',
          price: 320,
          rent: 28,
          oneHouse: 150,
          twoHouses: 450,
          threeHouses: 1000,
          fourHouses: 1200,
          hotel: 1400,
          mortgage: 160,
          houseCost: 200,
          hotelCost: 1400,
          hotelCostNotCalc: 200,
        },
        {
          _id: 'c-125',
          title: 'Short Line',
          color: '',
          price: 200,
          rent: 25,
          ifTwoCards: 50,
          ifthreeCards: 100,
          ifFourCards: 200,
          mortgage: 100,
        },
        {
          _id: 'c-126',
          title: 'Park Place',
          color: '#2863ad',
          price: 350,
          rent: 35,
          oneHouse: 175,
          twoHouses: 500,
          threeHouses: 1100,
          fourHouses: 1300,
          hotel: 1500,
          mortgage: 170,
          houseCost: 200,
          hotelCost: 1500,
          hotelCostNotCalc: 200,
        },
        {
          _id: 'c-127',
          title: 'Boardwalk',
          color: '#2863ad',
          price: 400,
          rent: 50,
          oneHouse: 200,
          twoHouses: 600,
          threeHouses: 1400,
          fourHouses: 1700,
          hotel: 2000,
          mortgage: 200,
          houseCost: 200,
          hotelCost: 1900,
          hotelCostNotCalc: 200,
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
    waterworkCard,
    electricCompanyCard,
  },
}
</script>

<style></style>
