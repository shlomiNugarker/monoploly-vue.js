<template>
  <section v-if="updates" class="all-updates">
    <section
      class="update-msg-modal"
      v-for="update in updates"
      :key="update"
      :style="{ 'background-color': '' }"
    >
      <div class="container">
        <div>
          <p>{{ update }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    updates: Array,
  },
  name: 'update-msg-modal',
  data() {
    return {}
  },
  computed: {
    currPLayer() {
      return this.$store.getters.currPLayer
    },
  },
  created() {},
  methods: {},
  components: {},
}
</script>

<style>
.all-updates {
  display: flex;
  position: absolute;
  top: 5px;
  justify-content: center;

  flex-direction: column;
}

.update-msg-modal {
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  height: 50px;
  top: 20px;
  /* position: absolute; */
  width: 500px;
  background-color: #cde7ce;
  margin: 0 0 3px 0px;
  box-shadow: -1px 1px 24px 3px rgb(0 0 0 / 75%);
}
</style>
