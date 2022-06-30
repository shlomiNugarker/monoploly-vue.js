<template>
  <section class="railroad-modal">
    <div class="modal-container">
      <div class="title">
        <p>{{ currPLayer.name }}, do you want to buy this company?</p>
        <p>{{ card.price }}$</p>
      </div>

      <div class="body-modal">
        <div>
          <component :is="'readingRailroadCard'" :card="card" />
        </div>

        <div class="btns-container">
          <button @click="buyRailroadCard(card._id)">Yes</button>
          <button @click="closeModal">No</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import readingRailroadCard from '../cards/reading-railroad-card.vue'
export default {
  props: {
    card: Object,
  },
  name: 'railroad-modal',
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
    buyRailroadCard(cardId) {
      console.log(this.card)
      this.$emit('buyRailroadCard', cardId)
    },
  },
  components: {
    readingRailroadCard,
  },
}
</script>

<style></style>
