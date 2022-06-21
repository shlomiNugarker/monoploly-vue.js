<template>
  <section class="chance-modal">
    <div class="modal-container">
      <chanceCards :card="card" />
      <button @click="doChanceTask">OK</button>
    </div>
  </section>
</template>

<script>
import propertyCard from '../cards/property-card.vue'
import utilityCard from '../cards/utility-card.vue'
import readingRailroadCard from '../cards/reading-railroad-card.vue'
import communityChestCard from '../cards/community-chest-card.vue'
import chanceCards from '../cards/chance-card.vue'
export default {
  props: {
    card: Object,
  },
  name: 'chance-modal',
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
    doChanceTask() {
      this.$emit('doChanceTask')
    },
  },
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
