<template>
  <section class="msg-modal">
    <div class="container">
      <div>
        <p>{{ card.msg }}</p>
      </div>
      <div>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
  },
  name: 'msg-modal',
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
  },
  components: {},
}
</script>

<style>
.msg-modal {
  background-color: lightcoral;
}
</style>
