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
    async doSteps({ state, commit, dispatch }, { newPosition }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const currPosition = copyBoard.currPLayer.position
        const playerToStep = copyBoard.currPLayer

        // Remove player from last pos:
        copyBoard.tiles[currPosition].players = copyBoard.tiles[
          currPosition
        ].players.filter((player) => playerToStep._id !== player._id)

        playerToStep.position = newPosition

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
    async buyRailroadCard({ state, commit }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        let playerId = copyBoard.currPLayer._id
        const position = state.board.currPLayer.position
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        const cardIdx = copyBoard.cards.railroadsCards.findIndex(
          (card) => card._id === cardId
        )
        var cardToBuy = copyBoard.cards.railroadsCards.splice(cardIdx, 1)
        copyBoard.players[playerIdx].balance -= cardToBuy[0].price
        copyBoard.players[playerIdx].railroadsCards.push(...cardToBuy)
        copyBoard.tiles[position].owner = {
          name: copyBoard.currPLayer.name,
          _id: copyBoard.currPLayer._id,
        }

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot buy railroad card..')
      }
    },
    async payTax({ state, commit }, { pay }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        let playerId = copyBoard.currPLayer._id
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        copyBoard.players[playerIdx].balance -= pay

        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot pay tax')
      }
    },
    async doChanceTask({ state, commit, dispatch }, { card }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerId = copyBoard.currPLayer._id
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        const cardIdx = copyBoard.cards.chanceCards.findIndex(
          (c) => c._id === card._id
        )
        let newPosition

        switch (card._id) {
          case 'chance-201':
            newPosition = 0
            await dispatch({ type: 'doSteps', newPosition })
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.players[playerIdx].balance += 200
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-202':
            console.log('chance-202')
            newPosition = 39
            await dispatch({ type: 'doSteps', newPosition })

            break
          case 'chance-203':
            console.log('chance-203')

            break
          case 'chance-204':
            console.log('chance-204')
            break
          case 'chance-205':
            console.log('chance-20')

            break
          case 'chance-206':
            console.log('chance-206')

            break
          case 'chance-208':
            console.log('chance-208')

            break
          case 'chance-209':
            console.log('chance-209')
            break
          case 'chance-210':
            console.log('chance-210')
            break
          case 'chance-211':
            console.log('chance-211')
            break
          case 'chance-212':
            console.log('chance-212')
            break
          case 'chance-213':
            console.log('chance-213')
            break
          case 'chance-214':
            console.log('chance-214')
            break
          case 'chance-215':
            console.log('chance-215')
            break
          case 'chance-216':
            console.log('chance-216')
            break
          default:
          // some code
        }
      } catch (err) {
        console.log('cannot doChanceTask..')
      }
    },
  },
}
