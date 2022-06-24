<template>
  <section class="community-chest-modal">
    <div class="modal-container">
      <communityChestCard :card="card" />
      <button @click="doCommunityTask">OK</button>
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
  name: 'community-chest-modal',
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
    closeModal() {
      this.$emit('closeModal')
    },
    doCommunityTask() {
      this.$emit('doCommunityTask')
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
