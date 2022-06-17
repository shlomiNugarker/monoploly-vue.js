import { boardService } from '../../services/board/board-service'

export default {
  state: {
    isLoading: false,
    board: null,
    filterBy: null,
    currDice: [],
  },
  getters: {
    board(state) {
      return state.board
    },
    cmpsOrder(state) {
      return state.cmpsOrder
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board
      // state.isLoading = false
    },
  },
  actions: {
    async getBoardById({ state, commit }, { boardId }) {
      try {
        // commit({
        //   type: 'setLoading',
        //   bool: true,
        // })

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

        const newPosition = playerToStep.position + currDice[0] + currDice[1]
        if (newPosition > 39) newPosition -= 40

        // place player in new pos:
        copyBoard.tiles[newPosition].players.push(playerToStep)
        const idx = copyBoard.players.findIndex(
          (player) => player._id === playerToStep._id
        )
        copyBoard.players[idx].position = newPosition

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })

        dispatch({
          type: 'swichToNextPlayer',
        })
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
    setCurrPlayer({ state, commit }, { currDice }) {},
  },
}
