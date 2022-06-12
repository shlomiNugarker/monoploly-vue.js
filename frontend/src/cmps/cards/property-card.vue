<template>
  <section class="property-card">
    <div class="card">
      <div class="header" :style="{ 'background-color': card.color }">
        <p>TITLE DEED</p>
        <h1>{{ card.title }}</h1>
      </div>
      <p class="rent">Rent {{ card.rent }}$.</p>
      <div class="prices">
        <div class="container-price">
          <p class="house">With 1 House</p>
          <span class="price">{{ card.oneHouse }}$.</span>
        </div>
        <div class="container-price">
          <p class="house">With 2 House</p>
          <span class="price">{{ card.twoHouses }}$.</span>
        </div>
        <div class="container-price">
          <p class="house">With 3 House</p>
          <span class="price">{{ card.threeHouses }}$.</span>
        </div>
        <div class="container-price">
          <p class="house">With 4 House</p>
          <span class="price">{{ card.fourHouses }}$.</span>
        </div>
      </div>
      <p class="hotel">With HOTEL {{ card.hotel }}$.</p>
      <p class="mortgage">Mortgage Value {{ card.mortgage }}$.</p>
      <p class="house-cost">Houses cost {{ card.houseCost }}$ each.</p>
      <p class="hotel-cost">
        Hotels, {{ card.hotelCostNotCalc }}$ plus 4 houses.
      </p>
      <p class="description">
        If a player owns ALL the lots of any Color-Group, the rent is <br />
        Doubled on Unimproved Lots in that group.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'property-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style></style>
