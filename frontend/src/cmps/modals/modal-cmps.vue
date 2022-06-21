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
      @closeModal="closeModal"
    />

    <chanceModal
      v-if="card.type === 'chanceCards'"
      :card="card"
      @closeModal="closeModal"
      @doChanceTask="doChanceTask"
    />

    <railroadCardModal
      v-if="card.type === 'railroadCard'"
      :card="card"
      @buyRailroadCard="buyRailroadCard"
      @closeModal="closeModal"
    />

    <msgModal
      v-if="card.type === 'msg'"
      :card="card"
      @closeModal="closeModal"
    />
  </section>
</template>

<script>
import propertyCardModal from './property-card-modal.vue'
import communityChestModal from './community-chest-modal.vue'
import railroadCardModal from './railroad-card-modal.vue'
import chanceModal from './chance-modal.vue'
import msgModal from './msg-modal.vue'

// import utilityCard from '../cards/utility-card.vue'

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
    buyRailroadCard(cardId) {
      this.$emit('buyRailroadCard', cardId)
    },
    closeModal() {
      this.$emit('closeModal')
    },
    doChanceTask() {
      this.$emit('doChanceTask')
    },
  },
  components: {
    propertyCardModal,
    communityChestModal,
    msgModal,
    railroadCardModal,
    chanceModal,
  },
}
</script>

<style></style>
