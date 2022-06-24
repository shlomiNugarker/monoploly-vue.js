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
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerToStep._id
        )

        if (copyBoard.players[playerIdx].isInJail) {
          copyBoard.players[playerIdx].isInJail--
          await boardService.save(copyBoard)
          commit({ type: 'setBoard', board: copyBoard })
          return
        }

        // Remove player from last pos:
        copyBoard.tiles[currPosition].players = copyBoard.tiles[
          currPosition
        ].players.filter((player) => playerToStep._id !== player._id)

        playerToStep.position = newPosition

        // place player in new pos:
        copyBoard.tiles[newPosition].players.push(playerToStep)
        copyBoard.players[playerIdx].position = newPosition

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
    async buyUtilityCard({ state, commit }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        let playerId = copyBoard.currPLayer._id
        const position = state.board.currPLayer.position
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        const cardIdx = copyBoard.cards.utilitiesCards.findIndex(
          (card) => card._id === cardId
        )
        var cardToBuy = copyBoard.cards.utilitiesCards.splice(cardIdx, 1)

        copyBoard.players[playerIdx].balance -= cardToBuy[0].price
        copyBoard.players[playerIdx].utilitiesCards.push(...cardToBuy)
        copyBoard.tiles[position].owner = {
          name: copyBoard.currPLayer.name,
          _id: copyBoard.currPLayer._id,
        }
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot buy utilitiesCards..', err)
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
    async payByDice({ state, commit, dispatch }, { amount, payTo }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      const currPlayerIdx = copyBoard.players.findIndex(
        (player) => player._id === copyBoard.currPLayer._id
      )
      const plyertoPayIdx = copyBoard.players.findIndex(
        (player) => player._id === payTo._id
      )
      copyBoard.players[currPlayerIdx].balance -= amount
      copyBoard.players[plyertoPayIdx].balance += amount
      copyBoard.currPLayer.isNextPayByDice = {}

      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
    },
    async doChanceTask({ state, commit, dispatch }, { card }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerId = copyBoard.currPLayer._id
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        // const cardIdx = copyBoard.cards.chanceCards.findIndex(
        //   (c) => c._id === card._id
        // )
        let newPosition
        let currPosition

        switch (card._id) {
          case 'chance-201': // Advance to "Go". (Collect $200)
            await dispatch({ type: 'doSteps', newPosition: 0 })
            await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
            break
          case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
            console.log('chance-202')
            if (state.board.currPLayer.position > 35) {
              await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
            }
            await dispatch({ type: 'doSteps', newPosition: 24 })

            break
          case 'chance-203': // Advance to St. Charles Place. If you pass Go, collect $200
            console.log('chance-203')
            if (state.board.currPLayer.position > 35) {
              await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
            }
            await dispatch({ type: 'doSteps', newPosition: 11 })
            break
          case 'chance-204': // Advance token to the nearest Utility
            console.log('chance-204')
            currPosition = state.board.currPLayer.position
            if (currPosition === 7) newPosition = 12
            else if (currPosition === 22) newPosition = 28
            await dispatch({ type: 'doSteps', newPosition })
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.currPLayer.isNextPayByDice = true
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-205': // Advance to the nearest Railroad
            console.log('chance-205')
            currPosition = state.board.currPLayer.position
            if (currPosition === 7) newPosition = 15
            else if (currPosition === 22) newPosition = 25
            else if (currPosition === 36) newPosition = 5
            await dispatch({ type: 'doSteps', newPosition })
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.currPLayer.isNextPayByDice = true
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-206': // Bank pays you dividend of $50
            console.log('chance-206')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 50 })
            break
          case 'chance-207': // Get out of Jail Free
            console.log('chance-207')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const cardIdx = copyBoard.cards.chanceCards.findIndex(
              (c) => c._id === card._id
            )
            var cardToSave = copyBoard.cards.chanceCards.splice(cardIdx, 1)
            copyBoard.players[playerIdx].chanceCards.push(...cardToSave)
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-208': // Go Back 3 Spaces
            console.log('chance-208')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const posBack = copyBoard.currPLayer.position - 3
            await dispatch({ type: 'doSteps', newPosition: posBack })
            break
          case 'chance-209': // Go to Jail
            console.log('chance-209')
            await dispatch({ type: 'doSteps', newPosition: 10 })
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.players[playerIdx].isInJail = 3
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            break
          case 'chance-210': // Make general repairs on all your property
            console.log('chance-210')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.players[playerIdx] /// TODO after add addHomeFunc: PAY FOR HOUSE=25 & HOTEL=100

            break
          case 'chance-211': // Pay poor tax of $15
            console.log('chance-211')
            await dispatch({ type: 'payMoney', playerIdx, amount: 15 })
            break
          case 'chance-212': // collect $200
            console.log('chance-212')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            if (copyBoard.players[playerIdx].position > 5) {
              copyBoard.players[playerIdx].balance += 200
            }
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            await dispatch({ type: 'doSteps', newPosition: 5 })

            break
          case 'chance-213': // Advance token to Boardwalk
            console.log('chance-213')
            await dispatch({ type: 'doSteps', newPosition: 39 })
            break
          case 'chance-214': // PAY EACH PLAYER $50
            console.log('chance-214')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const currPlayer = copyBoard.players[playerIdx]
            copyBoard.players.forEach((player) => {
              if (player._id !== currPlayer._id) {
                player.balance += 50
                copyBoard.players[playerIdx].balance -= 50
              }
            })
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-215':
            console.log('chance-215') // COLLECT $150
            await dispatch({ type: 'collectMoney', playerIdx, amount: 150 })
            break
          case 'chance-216':
            console.log('chance-216') // COLLECT $100
            await dispatch({ type: 'collectMoney', playerIdx, amount: 100 })
            break
          default:
          // some code
        }
      } catch (err) {
        console.log('cannot doChanceTask..')
      }
    },
    async collectMoney({ state, commit }, { playerIdx, amount }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      copyBoard.players[playerIdx].balance += amount
      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
    },
    async payMoney({ state, commit }, { playerIdx, amount }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      copyBoard.players[playerIdx].balance -= amount
      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
    },
    async doCommunityTask({ state, commit, dispatch }, { card }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerId = copyBoard.currPLayer._id
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )
        // const cardIdx = copyBoard.cards.chanceCards.findIndex(
        //   (c) => c._id === card._id
        // )
        let newPosition
        let currPosition

        switch (card._id) {
          case 'community-101': // Advance to "Go". (Collect $200)
            console.log('community-101')
            await dispatch({ type: 'doSteps', newPosition: 0 })
            await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
            break
          case 'community-102': // Collect $100
            console.log('community-102')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 100 })
            break
          case 'community-103': // Get Out of Jail Free
            console.log('community-103')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const cardIdx = copyBoard.cards.communityChestCards.findIndex(
              (c) => c._id === card._id
            )
            var cardToSave = copyBoard.cards.communityChestCards.splice(
              cardIdx,
              1
            )
            copyBoard.players[playerIdx].communityChestCards.push(...cardToSave)
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            break
          case 'community-104': // Collect $10
            await dispatch({ type: 'collectMoney', playerIdx, amount: 10 })

            break
          case 'community-105': // Collect $200
            console.log('community-105')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })

            break
          case 'community-106': // get $50
            console.log('community-106')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 50 })

            break
          case 'community-107': // Collect $20
            console.log('community-107')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 20 })

            break
          case 'community-108': // Receive for services $25.
            console.log('community-108')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 25 })

            break
          case 'community-109': // You inherit $100
            console.log('community-109')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 100 })

            break
          case 'community-110': // Collect $100
            console.log('community-110')
            await dispatch({ type: 'collectMoney', playerIdx, amount: 100 })

            break
          case 'community-111': // Collect $50 from every player for opening night seats
            console.log('community-111')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const currPlayer = copyBoard.players[playerIdx]
            copyBoard.players.forEach((player) => {
              if (player._id !== currPlayer._id) {
                player.balance -= 50
                copyBoard.players[playerIdx].balance += 50
              }
            })
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            break
          case 'community-112': // Pay $50
            console.log('community-112')
            await dispatch({ type: 'payMoney', playerIdx, amount: 50 })

            break
          case 'community-113': // Pay hospital $100
            console.log('community-113')
            await dispatch({ type: 'payMoney', playerIdx, amount: 100 })

            break
          case 'community-114': // Pay school tax of $150
            console.log('community-114')
            await dispatch({ type: 'payMoney', playerIdx, amount: 150 })

            break
          case 'community-115': // You are assessed for street repairs: Pay $40 per house and $115 per hotel you own
            console.log('community-115')
            // TODO AFTER FINISH ADD-HOME-FUNC
            break
          case 'community-116': // Go to Jail
            console.log('community-116')
            await dispatch({ type: 'doSteps', newPosition: 10 })
            copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.players[playerIdx].isInJail = 3
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            break
          default:
          // some code
        }
      } catch (err) {
        console.log('cannot doCommunityTask', err)
      }
    },
  },
}
