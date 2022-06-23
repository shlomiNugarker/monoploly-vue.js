<template>
  <section class="utility-card-modal">
    <div class="modal-container">
      <div class="title">
        <p>{{ currPLayer.name }}, do you want to buy this company?</p>
        <p>{{ card.price }}$</p>
      </div>

      <div class="body-modal">
        <div>
          <component :is="'utilityCard'" :card="card" />
        </div>

        <div class="btns-container">
          <button @click="buyUtilityCard(card._id)">Yes</button>
          <button @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import utilityCard from '../cards/utility-card.vue'
export default {
  props: {
    card: Object,
  },
  name: 'utility-card-modal',
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
    buyUtilityCard(cardId) {
      this.$emit('buyUtilityCard', cardId)
    },
  },
  components: {
    utilityCard,
  },
}
</script>

<style></style>
