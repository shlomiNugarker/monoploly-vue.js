<template>
  <section class="about-view">
    <div class="allCards">
      <div class="container">
        <div class="cards">
          <propertyCard
            v-for="card in propertyCards"
            :key="card._id"
            :card="card"
          />

          <utilityCard
            v-for="card in utilitiesCards"
            :key="card._id"
            :card="card"
          />

          <readingRailroadCard
            v-for="card in railroadsCards"
            :key="card._id"
            :card="card"
          />

          <communityChestCard
            v-for="card in communityChestCards"
            :key="card._id"
            :card="card"
          />

          <chanceCards
            v-for="card in chanceCards"
            :key="card._id"
            :card="card"
          />
        </div>
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
  name: 'about-view',
  data() {
    return {
      tokens: [
        {
          name: 'Scottish Terrier',
        },
        {
          name: 'Battleship',
        },
        {
          name: 'race car mid',
        },
        {
          name: 'Top Hat',
        },
        {
          name: 'Penguin',
        },
        {
          name: 'T-Rex',
        },
        {
          name: 'Cat',
        },
        {
          name: 'Rubber Ducky',
        },
      ],
      houses: 32,
      hotels: 12,
      propertyCards: [
        // Property Tiles
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
      ///////
      utilitiesCards: [
        {
          _id: 'c-107',
          title: 'Electric Company',
          price: 140,
          rent: '4 * Dice Roll',
          twoAreOwned: '10 * Dice Roll',
          mortgage: 75,
          background: '#cf8e61',
        },
        {
          _id: 'c-120',
          title: 'Waterworks',
          price: 100,
          rent: '4 * Dice Roll',
          twoAreOwned: '10 * Dice Roll',
          mortgage: 75,
          background: '#f6f4f4',
        },
      ],
      /////////
      railroadsCards: [
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
      ],
      ////////////
      communityChestCards: [
        {
          _id: 'cc-101',
          title: 'Community Chest',
          description: 'Advance to "Go". (Collect $200) ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-102',
          title: 'Community Chest',
          description: 'Life insurance matures - Collect $100',
          background: '#ffeb43',
        },
        {
          _id: 'cc-103',
          title: 'Community Chest',
          description: 'Get Out of Jail Free. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-104',
          title: 'Community Chest',
          description:
            'You have won second prize in a beauty contest. Collect $10.',
          background: '#ffeb43',
        },
        {
          _id: 'cc-105',
          title: 'Community Chest',
          description: 'Bank error in your favor. Collect $200. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-106',
          title: 'Community Chest',
          description: 'From sale of stock you get $50.',
          background: '#ffeb43',
        },
        {
          _id: 'cc-107',
          title: 'Community Chest',
          description: 'Income tax refund. Collect $20. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-108',
          title: 'Community Chest',
          description: 'Receive for services $25.',
          background: '#ffeb43',
        },
        {
          _id: 'cc-109',
          title: 'Community Chest',
          description: 'You inherit $100.',
          background: '#ffeb43',
        },
        {
          _id: 'cc-110',
          title: 'Community Chest',
          description: 'Holiday Fund matures. Collect $100. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-111',
          title: 'Community Chest',
          description:
            'Collect $50 from every player for opening night seats. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-112',
          title: 'Community Chest',
          description: "Doctor's fees. Pay $50.",
          background: '#ffeb43',
        },
        {
          _id: 'cc-113',
          title: 'Community Chest',
          description: 'Pay hospital $100.',
          background: '#ffeb43',
        },
        {
          _id: 'cc-114',
          title: 'Community Chest',
          description: 'Pay school tax of $150',
          background: '#ffeb43',
        },
        {
          _id: 'cc-115',
          title: 'Community Chest',
          description:
            'You are assessed for street repairs: Pay $40 per house and $115 per hotel you own. ',
          background: '#ffeb43',
        },
        {
          _id: 'cc-116',
          title: 'Community Chest',
          description: 'Go to Jail. ',
          background: '#ffeb43',
        },
      ],
      ////////////////////
      chanceCards: [
        {
          _id: 'cc-201',
          title: 'Chance',
          description: 'Advance to "Go". (Collect $200) ',
          background: '#ff5c00',
        },
        {
          _id: 'cc-202',
          title: 'Chance',
          description: 'Advance token to Boardwalk.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-203',
          title: 'Chance',
          description: 'Advance to Illinois Ave.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-204',
          title: 'Chance',
          description: 'Advance to St. Charles Place.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-205',
          title: 'Chance',
          description: 'If you pass Go, collect $200.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-206',
          title: 'Chance',
          description:
            'Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-207',
          title: 'Chance',
          description:
            'Advance token to the nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total 10 times the amount thrown.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-208',
          title: 'Chance',
          description: 'Go Back 3 Spaces.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-209',
          title: 'Chance',
          description: 'Bank pays you dividend of $50. ',
          background: '#ff5c00',
        },
        {
          _id: 'cc-210',
          title: 'Chance',
          description: 'Your building and loan matures. Collect $150. ',
          background: '#ff5c00',
        },
        {
          _id: 'cc-211',
          title: 'Chance',
          description: 'Pay poor tax of $15',
          background: '#ff5c00',
        },
        {
          _id: 'cc-212',
          title: 'Chance',
          description:
            'You have been elected Chairman of the Board. Pay each player $50.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-213',
          title: 'Chance',
          description:
            'Make general repairs on all your property: For each house pay $25, For each hotel {pay} $100.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-214',
          title: 'Chance',
          description: ' Go directly to Jail.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-215',
          title: 'Chance',
          description:
            'Get out of Jail Free. This card may be kept until needed, or traded/sold.',
          background: '#ff5c00',
        },
        {
          _id: 'cc-216',
          title: 'Chance',
          description: 'You have won a crossword competition. Collect $100.',
          background: '#ff5c00',
        },
      ],
    }
  },
  computed: {},
  created() {},
  methods: {},
  components: {
    propertyCard,
    utilityCard,
    readingRailroadCard,
    communityChestCard,
    chanceCards,
  },
}
</script>

<style></style>
