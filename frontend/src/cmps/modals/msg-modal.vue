<template>
  <section class="msg-modal">
    <div class="container">
      <div>
        <p>{{ msg }}</p>
      </div>
      <div>
        <button @click="closeModal">Ok</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    card: Object,
    msg: String,
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
