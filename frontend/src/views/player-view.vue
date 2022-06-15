<template>
  <section class="player-view">
    <div class="containerr">
      <div class="go-back" @click="closeDetails">x</div>
      <div class="player">
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'player-view',
  data() {
    return {
      player: null,
      players: [
        {
          _id: 'p100',
          name: 'Shlomi',
          position: 0,
          propertyCards: [
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
          ],
          balance: 2000,
        },
        {
          _id: 'p101',
          name: 'Eden',
          position: 0,
          propertyCards: [],
          balance: 2000,
        },
      ],
    }
  },
  computed: {},
  created() {
    this.player = this.players[0]
    console.log()
  },
  methods: {
    closeDetails() {
      console.log()
      this.$router.push('/board/')
    },
  },
  components: {},
}
</script>

<style></style>
