<template>
  <section class="reading-railroad-card">
    <div class="containerr">
      <div class="container-logo">
        <i class="logo drawing fa fa-subway"></i>
      </div>
      <h1 class="title">{{ card.title }}</h1>
      <div class="rent">
        <p>Rent</p>
        <p>{{ card.rent }}$</p>
      </div>

      <div class="if">
        <p>If 2 R.R.'s are owned</p>
        <p>{{ card.ifTwoCards }}$</p>
      </div>

      <div class="if">
        <p>If 3 R.R's are owned</p>
        <p>{{ card.ifthreeCards }}$</p>
      </div>
      <div class="if">
        <p>If 4 R.R's are owned</p>
        <p>{{ card.ifFourCards }}$</p>
      </div>

      <div class="mortgage">
        <p>Mortgage Value</p>
        <p>{{ card.mortgage }}$</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'reading-railroad-card',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
