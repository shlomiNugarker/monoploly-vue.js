<template>
  <section>
    <main>
      <div class="links">
        <router-link to="/">Home </router-link>|
        <!-- <router-link :to="'/board/' + board._id">board</router-link>| -->
        <!-- <router-link to="/board/player">player</router-link>| -->
        <router-link to="/about">about</router-link>
        <p @click="clear">clear boards</p>
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
  background: rgb(74, 228, 138);
  margin: 3px;
  padding: 7px;
  position: fixed;
  z-index: 5;
  border-radius: 10px;
}
a {
  color: rgba(0, 0, 0, 0.715);
}
p {
  cursor: pointer;
}
.loading {
  height: 100vh;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
