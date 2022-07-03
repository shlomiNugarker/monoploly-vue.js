<template>
  <section class="jail-out-modal">
    <div class="container">
      <div>
        <p>{{ currPLayer.name }}, do you want to pay $100 or try double?</p>
      </div>
      <div>
        <button @click="tryDouble">Try double!</button>
        <button @click="payToJail">Pay $100</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'jail-out-modal',
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
    tryDouble() {
      this.$emit('tryDouble')
    },
    payToJail() {
      this.$emit('payToJail')
    },
  },
  components: {},
}
</script>

<style></style>
