<template>
  <section class="home-view">
    <header class="header"></header>
    <div class="container">
      <div>
        Choose one last Boards:
        <div v-for="board in boards" :key="board._id">
          <p class="opt-board" @click="goToBoard(board._id)">
            Board: {{ board._id }} <br />
            {{ board.players.length }} players
          </p>
          <p></p>
        </div>
      </div>

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

      <input type="text" placeholder="Add.." v-model="name" />
      <button @click="addPlayer">Add player +</button><br />
      <button @click="startGame">Play !</button>
    </div>
    <div class="footer"></div>
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
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  async created() {
    await this.$store.dispatch({
      type: 'getBoards',
    })
    console.log(this.boards)
  },
  methods: {
    addPlayer() {
      if (this.playersToAdd.length > 7) return
      this.playersToAdd.push({
        _id: utilService.makeId(),
        name: this.name || 'New-Player-',
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
    goToBoard(boardId) {
      this.$router.push('/board/' + boardId)
    },
    startGame() {
      if (!this.playersToAdd || !this.playersToAdd.length) return
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

<style>
.opt-board {
  cursor: pointer;
  text-align: center;
  margin: 5px;
  padding: 5px;
  color: white;
  background-color: rgba(148, 126, 169, 0.414);
  border-radius: 5px;
}
</style>
