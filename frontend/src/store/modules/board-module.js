import { boardService } from '../../services/board/board-service'

export default {
  state: {
    isLoading: false,
    board: null,
    filterBy: null,
    currDice: [],
    currPLayer: '',
  },
  getters: {
    board(state) {
      return state.board
    },
    cmpsOrder(state) {
      return state.cmpsOrder
    },
    cmpsOrder(state) {
      return state.currPLayer
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
    doSteps({ state, commit }, { currDice }) {},
    setCurrPlayer({ state, commit }, { currDice }) {},
  },
}
