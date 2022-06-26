<template>
  <section class="tile-cmp">
    <div class="conainer">
      <div>
        <div
          class="color-bar"
          :style="{ 'background-color': tile.color }"
        ></div>
        <p>{{ tile.name }}</p>
        <div v-if="tile.players.length" class="players">
          <div class="player" v-for="player in tile.players" :key="player">
            <font-awesome-icon
              :style="{ color: player.colorToken }"
              class="token-player"
              icon="chess-pawn"
            />
          </div>
        </div>

        <div class="building-container" v-if="ownerCard">
          <div
            class="house"
            v-if="(ownerCard.houses < 5) & (ownerCard.houses > 0)"
          >
            <font-awesome-icon class="house" icon="house" />
            <span class="house-num">{{ ownerCard.houses }}</span>
          </div>
          <div class="hotel" v-if="ownerCard.houses > 4">
            <font-awesome-icon class="hotel" icon="hotel" />
            <!-- <span class="hotel-num">{{ ownerCard.hotels }}</span> -->
          </div>
        </div>
      </div>

      <div class="price">{{ tile.price }}$</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tile: Object,
    tileIdx: Number,
  },
  name: 'tile-cmp',
  data() {
    return {}
  },
  created() {
    console.log(this.ownerCard)
  },
  methods: {},
  computed: {
    board() {
      return this.$store.getters.board
    },
    players() {
      return this.$store.getters.players
    },
    cards() {
      return this.$store.getters.cards
    },
    currPLayer() {
      return this.$store.getters.currPLayer
    },
    playerIdx() {
      return this.$store.getters.playerIdx
    },
    owner() {
      return this.tile.owner
    },
    ownerCard() {
      const ownerIdx = this.board.players.findIndex(
        (player) => player._id === this.tile.owner?._id
      )
      return (
        this.board.players[ownerIdx]?.propertyCards.filter(
          (card) => card.title === this.tile.name
        )[0] || ''
      )
    },
  },
}
</script>

<style>
.house {
  font-size: 15px;
  color: #48a757;
}
.hotel {
  font-size: 15px;
  color: #7b1203;
}
</style>
