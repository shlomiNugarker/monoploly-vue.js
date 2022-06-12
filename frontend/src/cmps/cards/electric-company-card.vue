<template>
  <section class="electric-company-card">
    <div class="containerr">
      <div class="container-logo">
        <font-awesome-icon icon="bolt-lightning" />
      </div>
      <h1 class="title">ELECTRIC COMPANY</h1>
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
        <p class="price">75$</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'electric-company-card',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
