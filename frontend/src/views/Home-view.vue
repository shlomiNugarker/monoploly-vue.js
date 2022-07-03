<template>
  <section class="home-view">
    <header class="header">header</header>
    <div class="container">
      <h1>players:</h1>

      <div
        class="players-to-add"
        v-for="player in playersToAdd"
        :key="player._id"
      >
        <div class="player-to-add">
          <p>
            <font-awesome-icon
              :style="{ color: player.colorToken }"
              class="token-player"
              icon="chess-pawn"
            />
          </p>
          <p>
            {{ player.name }}
          </p>
        </div>
      </div>

      <input type="text" v-model="name" />
      <button @click="addPlayer">Add player +</button><br />
      <button @click="startGame">Play !</button>
    </div>
  </section>
</template>

<script>
import { utilService } from '../services/util.service'
export default {
  name: 'home-view',
  data() {
    return {
      name: '',
      playersToAdd: [],
    }
  },
  computed: {},
  created() {},
  methods: {
    addPlayer() {
      if (this.playersToAdd.length > 7) return
      this.playersToAdd.push({
        _id: utilService.makeId(),
        name: this.name || 'New-Player-' + utilService.makeId(),
        position: 0,
        propertyCards: [],
        railroadsCards: [],
        utilitiesCards: [],
        communityChestCards: [],
        chanceCards: [],
        isInJail: 0,
        balance: 2000,
        colorToken: utilService.getRandomColor(),
      })
      this.name = ' '
    },
    startGame() {
      this.getNewBoard()
    },
    async getNewBoard() {
      const board = await this.$store.dispatch({
        type: 'getNewBoard',
        players: JSON.parse(JSON.stringify(this.playersToAdd)),
      })
      this.$router.push('/board/' + board._id)
    },
  },
  components: {},
}
</script>

<style></style>
