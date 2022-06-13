<template>
  <section
    class="utilitie-card"
    :style="{ 'background-color': card.background }"
  >
    <div class="containerr">
      <div class="container-logo">
        <font-awesome-icon
          v-if="card.title === 'Waterworks'"
          class="logo"
          icon="faucet-drip"
        />
        <font-awesome-icon
          v-if="card.title === 'Electric Company'"
          class="logo"
          icon="bolt-lightning"
        />
      </div>
      <h1 class="title">{{ card.title }}</h1>
      <div class="description">
        <p>
          If one "Utility" is owned <br />
          rent is 4 times amount <br />
          shown on dice.
        </p>
        <p>
          If both "Utilities" are <br />
          owned rent is 10 times <br />
          amount shown on dice.
        </p>
      </div>
      <div class="mortgage">
        <p>Mortgage Value</p>
        <p class="price">{{ card.price }}$</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'waterwork-card-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
