<template>
  <section class="city-modal">
    <div class="modal-container">
      <div class="title">
        <p>{{ currPLayer.name }}, do you want to buy this city?</p>
        <p>{{ card.price }}$</p>
      </div>

      <div class="body-modal">
        <div>
          <component :is="'propertyCard'" :card="card" />
        </div>

        <div class="btns-container">
          <button @click="buyPropertyCard(card._id)">Yes</button>
          <button @click="closePropertyModal">No</button>
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
  name: 'city-modal',
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
    propertyCard,
  },
}
</script>

<style></style>
