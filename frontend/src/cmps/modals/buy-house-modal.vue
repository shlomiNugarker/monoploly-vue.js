<template>
  <section class="buy-house-modal">
    <div class="modal-container">
      <div class="title">
        <p>{{ currPLayer.name }}, do you want to buy a house in this city?</p>
        <p>{{ card.houseCost }}$</p>
      </div>

      <div class="body-modal">
        <div>
          <component :is="'propertyCard'" :card="card" />
        </div>

        <div class="btns-container">
          <button @click="buyHouse(card._id)">Yes</button>
          <button @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import propertyCard from '../cards/property-card.vue'

export default {
  props: {
    card: Object,
  },
  name: 'buy-house-modal',
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
    buyHouse(cardId) {
      this.$emit('buyHouse', cardId)
    },
  },
  components: {
    propertyCard,
  },
}
</script>

<style></style>
