<template>
  <section>
    <main>
      <div class="links">
        <router-link to="/">Home</router-link>|
        <!-- <router-link :to="'/board/' + board._id">board</router-link>| -->
        <!-- <router-link to="/board/player">player</router-link>| -->
        <router-link to="/about">about</router-link>
        <p @click="clear">clear local storage</p>
      </div>
      <router-view />
    </main>
  </section>
</template>

<script>
export default {
  name: 'App',
  created() {
    // const boardId = 'b101'
    // this.$store.dispatch({ type: 'getBoardById', boardId })
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  methods: {
    clear() {
      console.log('clearing')
      localStorage.clear()
    },
  },
  components: {},
}
</script>

<style>
.links {
  /* display: none; */
  background: rgb(255, 150, 150);
  position: fixed;
  z-index: 5;
}
a {
  color: rgba(0, 0, 0, 0.715);
}
.loading {
  height: 100vh;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
