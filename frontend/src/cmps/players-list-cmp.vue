<template>
  <section class="players-list-cmp" :class="isListOpenStyle">
    <playerReviewCmp
      v-for="player in players"
      :key="player._id"
      :player="player"
    />
    <button @click="isListOpen = !isListOpen">
      <font-awesome-icon v-if="!isListOpen" icon="angle-left" />
      <font-awesome-icon v-if="isListOpen" icon="angle-right" />
    </button>
  </section>
</template>

<script>
import playerReviewCmp from './player-review-cmp.vue'
export default {
  props: {
    players: Array,
  },
  name: 'players-list-cmp',
  data() {
    return {
      isListOpen: true,
    }
  },
  created() {},
  methods: {},
  computed: {
    isListOpenStyle() {
      if (this.isListOpen) return ''
      return 'list-close'
    },
  },
  components: {
    playerReviewCmp,
  },
}
</script>

<style>
button {
  position: absolute;
  left: -28px;
  height: 90px;
  border-radius: 5px;
  padding: 10px;
  border: none;
}
</style>
