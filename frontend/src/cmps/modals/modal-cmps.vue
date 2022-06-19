<template>
  <section class="modals" v-if="card">
    <propertyCardModal
      v-if="card.type === 'propertyCard'"
      :card="card"
      @closePropertyModal="closePropertyModal"
      @buyPropertyCard="buyPropertyCard"
    />
    <communityChestModal
      v-if="card.type === 'communityChestCard'"
      :card="card"
    />
  </section>
</template>

<script>
import propertyCardModal from './property-card-modal.vue'
import communityChestModal from './community-chest-modal.vue'

// import propertyCard from '../cards/property-card.vue'
// import utilityCard from '../cards/utility-card.vue'
// import readingRailroadCard from '../cards/reading-railroad-card.vue'
// import communityChestCard from '../cards/community-chest-card.vue'
// import chanceCards from '../cards/chance-card.vue'
export default {
  props: {
    card: Object,
  },
  name: 'modals',
  data() {
    return {}
  },
  computed: {
    currPLayer() {
      return this.$store.getters.currPLayer
    },
  },
  created() {},
  methods: {
    closePropertyModal() {
      this.$emit('closePropertyModal')
    },
    buyPropertyCard(cardId) {
      this.$emit('buyPropertyCard', cardId)
    },
  },
  components: {
    propertyCardModal,
    communityChestModal,
  },
}
</script>

<style></style>
