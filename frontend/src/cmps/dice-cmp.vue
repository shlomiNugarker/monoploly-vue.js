<template>
  <section class="dice-cmp" @click="throwDice">
    <div class="dice-container" v-if="currDice">
      git
      <font-awesome-icon class="dice" :icon="'dice-' + firstDiceStr" />
      <font-awesome-icon class="dice" :icon="'dice-' + secondDiceStr" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currDice: Array,
  },
  name: 'dice-cmp',
  data() {
    return {}
  },
  created() {},
  methods: {
    throwDice() {
      console.log(this.currDice)
      console.log('d')
      this.$emit('throwDice')
    },
  },
  computed: {
    firstDiceStr() {
      var firstDiceStr
      switch (this.currDice[0]) {
        case 1:
          firstDiceStr = 'one'
          break
        case 2:
          firstDiceStr = 'two'
          break
        case 3:
          firstDiceStr = 'three'
          break
        case 4:
          firstDiceStr = 'four'
          break
        case 5:
          firstDiceStr = 'five'
          break
        case 6:
          firstDiceStr = 'six'
          break
      }
      return firstDiceStr
    },
    secondDiceStr() {
      var secondDiceStr
      switch (this.currDice[1]) {
        case 1:
          secondDiceStr = 'one'
          break
        case 2:
          secondDiceStr = 'two'
          break
        case 3:
          secondDiceStr = 'three'
          break
        case 4:
          secondDiceStr = 'four'
          break
        case 5:
          secondDiceStr = 'five'
          break
        case 6:
          secondDiceStr = 'six'
          break
      }
      return secondDiceStr
    },
  },
}
</script>

<style></style>
