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
      @doCommunityTask="doCommunityTask"
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

    <utilityCardModal
      v-if="card.type === 'utilityCard'"
      :card="card"
      @buyUtilityCard="buyUtilityCard"
      @closeModal="closeModal"
    />

    <buyHouseModal
      v-if="card.type === 'buyHouse'"
      :card="card"
      @buyHouse="buyHouse"
      @closeModal="closeModal"
    />

    <jailOutModal
      v-if="card.type === 'jail'"
      @tryDouble="tryDouble"
      @payToJail="payToJail"
    />

    <msgModal v-if="msg" :msg="msg" @closeModal="closeModal" />
  </section>
</template>

<script>
import propertyCardModal from './property-card-modal.vue'
import communityChestModal from './community-chest-modal.vue'
import railroadCardModal from './railroad-card-modal.vue'
import chanceModal from './chance-modal.vue'
import utilityCardModal from './utility-card-modal.vue'
import buyHouseModal from './buy-house-modal.vue'
import jailOutModal from './jail-out-modal.vue'

import msgModal from './msg-modal.vue'

// import utilityCard from '../cards/utility-card.vue'

export default {
  props: {
    card: Object,
    msg: String,
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
    buyUtilityCard(cardId) {
      this.$emit('buyUtilityCard', cardId)
    },
    buyHouse(cardId) {
      this.$emit('buyHouse', cardId)
    },

    closeModal() {
      this.$emit('closeModal')
    },
    doChanceTask() {
      this.$emit('doChanceTask')
    },
    doCommunityTask() {
      this.$emit('doCommunityTask')
    },
    tryDouble() {
      this.$emit('tryDouble')
    },
    payToJail() {
      this.$emit('payToJail')
    },
  },
  components: {
    propertyCardModal,
    communityChestModal,
    utilityCardModal,
    msgModal,
    railroadCardModal,
    chanceModal,
    buyHouseModal,
    jailOutModal,
  },
}
</script>

<style></style>
