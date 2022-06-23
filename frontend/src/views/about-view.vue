<template>
  <section class="about-view">
    <div class="allCards">
      <div class="container" v-if="cards">
        <div class="cards">
          <propertyCard
            v-for="card in cards.propertyCards"
            :key="card._id"
            :card="card"
          />

          <utilityCard
            v-for="card in cards.utilitiesCards"
            :key="card._id"
            :card="card"
          />

          <readingRailroadCard
            v-for="card in cards.railroadsCards"
            :key="card._id"
            :card="card"
          />

          <communityChestCard
            v-for="card in cards.communityChestCards"
            :key="card._id"
            :card="card"
          />

          <chanceCards
            v-for="card in cards.chanceCards"
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
    return {}
  },
  computed: {
    cards() {
      return this.$store.getters.cards
    },
  },
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
