<template>
  <section class="players-list-cmp" :class="isListOpenStyle">
    <playerReviewCmp
      v-for="player in players"
      :key="player._id"
      :player="player"
    />
    <button class="toggle-list-btn" @click="isListOpen = !isListOpen">
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

<style></style>
