<template>
  <section>
    <main>
      <div class="links">
        <router-link to="/">Home</router-link>|
        <router-link to="/board">board</router-link>|
        <router-link to="/board/player">player</router-link>|
        <router-link to="/about">about</router-link>
      </div>
      <router-view />
    </main>
  </section>
</template>

<script>
export default {
  name: 'App',
  created() {},
  computed: {},
  components: {},
}
</script>

<style>
.links {
  background: rgb(255, 150, 150);
  position: fixed;
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
