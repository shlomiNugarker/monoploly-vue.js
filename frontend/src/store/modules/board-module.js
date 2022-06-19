import { boardService } from '../../services/board/board-service'

export default {
  state: {
    board: null,
    currDice: [],
  },
  getters: {
    board(state) {
      return state.board
    },
    cards(state) {
      return state.board?.cards
    },
    cmpsOrder(state) {
      return state.cmpsOrder
    },
    currPLayer(state) {
      return state.board.currPLayer
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board
    },
  },
  actions: {
    async getBoardById({ state, commit }, { boardId }) {
      try {
        const board = await boardService.getBoardById(boardId)
        commit({
          type: 'setBoard',
          board,
        })
      } catch {
        console.log('cannot get board..')
      }
    },
    async doSteps({ state, commit, dispatch }, { currDice }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const currPosition = copyBoard.currPLayer.position
        const playerToStep = copyBoard.currPLayer

        // Remove player from last pos:
        copyBoard.tiles[currPosition].players = copyBoard.tiles[
          currPosition
        ].players.filter((player) => playerToStep._id !== player._id)

        let newPosition = playerToStep.position + currDice[0] + currDice[1]
        if (newPosition > 39) newPosition -= 40
        playerToStep.position = newPosition // POSITION AFTER UPDATE?

        // place player in new pos:
        copyBoard.tiles[newPosition].players.push(playerToStep)
        const idx = copyBoard.players.findIndex(
          (player) => player._id === playerToStep._id
        )
        copyBoard.players[idx].position = newPosition

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot do steps..', err)
      }
    },
    async swichToNextPlayer({ state, commit }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const players = copyBoard.players
        let currPLayer = copyBoard.currPLayer
        const idx = players.findIndex((player) => player._id === currPLayer._id)

        if (idx + 1 < players.length) {
          currPLayer = players[idx + 1]
        } else {
          currPLayer = players[0]
        }
        copyBoard.currPLayer = currPLayer

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot swich players..', err)
      }
    },
    async buyPropertyCard({ state, commit }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        let playerId = copyBoard.currPLayer._id
        const position = state.board.currPLayer.position
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        const cardIdx = copyBoard.cards.propertyCards.findIndex(
          (card) => card._id === cardId
        )
        var cardToBuy = copyBoard.cards.propertyCards.splice(cardIdx, 1)
        copyBoard.players[playerIdx].balance -= cardToBuy[0].price
        copyBoard.players[playerIdx].propertyCards.push(...cardToBuy)
        copyBoard.tiles[position].owner = {
          name: copyBoard.currPLayer.name,
          _id: copyBoard.currPLayer._id,
        }

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot buy property card..', err)
      }
    },
  },
}
