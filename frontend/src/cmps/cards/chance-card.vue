<template>
  <section class="chance-card">
    <div class="containerr">
      <p class="title">{{ card.title }}</p>
      <div class="container-desc">
        <h1 class="description">
          {{ card.description }}
        </h1>
      </div>
      <div class="img-container">
        <!-- <img class="img-cc" src="../../styles/images/1.png" alt="" /> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'chance-card',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
