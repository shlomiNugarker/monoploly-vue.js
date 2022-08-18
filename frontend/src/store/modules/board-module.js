import { boardService } from '../../services/board/board-service'
import { utilService } from '../../services/util.service'

export default {
  state: {
    board: null,
    boards: null,
    currDice: [],
  },
  getters: {
    board(state) {
      return state.board
    },
    boards(state) {
      return state.boards
    },
    doubleCount(state) {
      return state.board.doubleCount
    },
    currDice(state) {
      return state.board.currDice
    },
    cards(state) {
      return state.board?.cards
    },
    cmpsOrder(state) {
      return state.cmpsOrder
    },
    currPLayer(state) {
      return state.board?.currPLayer
    },
    playerIdx(state) {
      const playerId = state.board.currPLayer._id
      return state.board.players.findIndex((player) => player._id === playerId)
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board
    },
    setBoards(state, { boards }) {
      state.boards = boards
    },
    async doSteps(state, { newPosition }) {},
    doubleCount(state) {
      state.doubleCount++
    },
  },
  actions: {
    async getNewBoard({ state, commit, dispatch }, { players }) {
      const board = await boardService.getNewBoard(players)
      const addedBoard = await boardService.save(board)
      commit({ type: 'setBoard', board: addedBoard })
      return addedBoard
    },
    async getBoards({ commit }) {
      const boards = await boardService.query()
      commit({ type: 'setBoards', boards })
      return boards
    },
    async throwDice({ state, commit, dispatch, getters }, { dice }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      copyBoard = JSON.parse(JSON.stringify(state.board))
      copyBoard.currDice = dice
      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
    },
    async getBoardById({ state, commit, getters }, { boardId }) {
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
    async doSteps({ state, commit, dispatch, getters }, { newPosition }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        let currPosition = copyBoard.currPLayer.position
        let playerToStep = copyBoard.currPLayer
        let playerIdx = getters.playerIdx
        const isInJail = copyBoard.players[playerIdx].isInJail
        let isDouble
        if (getters.currDice?.length) {
          isDouble = getters.currDice[0] === getters.currDice[1]
        }

        if (isInJail) {
          copyBoard.players[playerIdx].isInJail--
          await boardService.save(copyBoard)
          commit({ type: 'setBoard', board: copyBoard })
          if (isDouble) {
            await dispatch({ type: 'getOutOfJail', playerIdx })
            await dispatch({ type: 'doSteps', newPosition })
          }
          return
        }

        if (isDouble) copyBoard.doubleCount++
        if (newPosition >= 0 && currPosition > newPosition) {
          await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
          copyBoard = JSON.parse(JSON.stringify(state.board))
          currPosition = copyBoard.currPLayer.position
          playerToStep = copyBoard.currPLayer
          playerIdx = copyBoard.players.findIndex(
            (player) => player._id === playerToStep._id
          )
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
    // async getOutOfJail({ state, commit, dispatch, getters }) {
    //   console.log('get out of jail')
    //   await dispatch({ type: 'doSteps', newPosition: 10 })
    //   let copyBoard = JSON.parse(JSON.stringify(state.board))
    //   let playerIdx = getters.playerIdx
    //   copyBoard.doubleCount = 0
    //   copyBoard.players[playerIdx].isInJail = 0
    //   await boardService.save(copyBoard)
    //   commit({ type: 'setBoard', board: copyBoard })
    // },
    async swichToNextPlayer({ state, commit, getters }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const players = copyBoard.players
        let currPLayer = copyBoard.currPLayer
        let playerIdx = getters.playerIdx
        const isNextPlayerNotLast = playerIdx + 1 < players.length

        if (isNextPlayerNotLast) {
          currPLayer = players[playerIdx + 1]
        } else {
          currPLayer = players[0]
        }
        copyBoard.doubleCount = 0
        copyBoard.currDice = null
        copyBoard.currPLayer = currPLayer
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot swich players..', err)
      }
    },
    async buyPropertyCard({ state, commit, getters }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerPos = state.board.currPLayer.position
        const playerIdx = getters.playerIdx
        const cardIdx = copyBoard.cards.propertyCards.findIndex(
          (card) => card._id === cardId
        )
        var cardToBuy = copyBoard.cards.propertyCards.splice(cardIdx, 1)
        copyBoard.players[playerIdx].balance -= cardToBuy[0].price
        copyBoard.players[playerIdx].propertyCards.push(...cardToBuy)
        copyBoard.tiles[playerPos].owner = {
          name: copyBoard.currPLayer.name,
          _id: copyBoard.currPLayer._id,
        }
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot buy property card..', err)
      }
    },
    async buyRailroadCard({ state, commit, getters }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const position = state.board.currPLayer.position
        const playerIdx = getters.playerIdx
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
    async buyUtilityCard({ state, commit, getters }, { cardId }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerPos = state.board.currPLayer.position
        const playerIdx = getters.playerIdx
        const cardIdx = copyBoard.cards.utilitiesCards.findIndex(
          (card) => card._id === cardId
        )
        var cardToBuy = copyBoard.cards.utilitiesCards.splice(cardIdx, 1)
        copyBoard.players[playerIdx].balance -= cardToBuy[0].price
        copyBoard.players[playerIdx].utilitiesCards.push(...cardToBuy)
        copyBoard.tiles[playerPos].owner = {
          name: copyBoard.currPLayer.name,
          _id: copyBoard.currPLayer._id,
        }
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot buy utilitiesCards..', err)
      }
    },
    async payTax({ state, commit, getters }, { pay }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerIdx = getters.playerIdx
        copyBoard.players[playerIdx].balance -= pay
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot pay tax', err)
      }
    },
    async payByDice({ state, commit, getters }, { times, payTo }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      const currPlayerIdx = copyBoard.players.findIndex(
        (player) => player._id === copyBoard.currPLayer._id
      )
      const plyertoPayIdx = copyBoard.players.findIndex(
        (player) => player._id === payTo._id
      )
      const amount = (copyBoard.currDice[0] + copyBoard.currDice[1]) * times
      copyBoard.players[currPlayerIdx].balance -= amount
      copyBoard.players[plyertoPayIdx].balance += amount
      copyBoard.currPLayer.isNextPayByDice = {}
      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
      return amount
    },
    async doChanceTask({ state, commit, dispatch, getters }, { card }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerIdx = getters.playerIdx
        let newPosition
        let currPosition

        switch (card._id) {
          case 'chance-201': // Advance to "Go". (Collect $200)
            await dispatch({ type: 'doSteps', newPosition: 0 })
            break
          case 'chance-202': // Advance to Illinois Ave. {Avenue}. If you pass Go, collect $200.
            console.log('chance-202')
            // if (state.board.currPLayer.position > 35) {
            //   await dispatch({ type: 'collectMoney', playerIdx, amount: 200 })
            // }
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
            copyBoard.currPLayer.isNextPayByDice = { isTrue: true, payTo: null } ////---------------------------------------- TO DO SOMETHING WITH PAYTO...! -----------------------------------
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
            copyBoard.currPLayer.isNextPayByDice = { isTrue: true, payTo: null }
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
            await dispatch({ type: 'goToJail', playerIdx })
            break
          case 'chance-210': // Make general repairs on all your property
            console.log('chance-210')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            let homeCount = 0
            let hotelCount = 0
            copyBoard.players[playerIdx].propertyCards.forEach((card) => {
              if (card.houses > 4) hotelCount++
              if (card.houses < 5) homeCount += card.houses
            })
            copyBoard.players[playerIdx].balance -= homeCount * 25
            copyBoard.players[playerIdx].balance -= hotelCount * 100
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })

            break
          case 'chance-211': // Pay poor tax of $15
            console.log('chance-211')
            await dispatch({ type: 'payMoney', playerIdx, amount: 15 })
            break
          case 'chance-212': // collect $200
            console.log('chance-212')
            copyBoard = JSON.parse(JSON.stringify(state.board))
            const playerPos = copyBoard.players[playerIdx].position
            if (playerPos > 5) {
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
        console.log('cannot doChanceTask..', err)
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
    async goToJail({ state, commit, dispatch }, { playerIdx }) {
      try {
        await dispatch({ type: 'doSteps', newPosition: 10 })
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        copyBoard.currDice = null
        copyBoard.doubleCount = 0
        // copyBoard.isDubble = 0
        copyBoard.players[playerIdx].isInJail = 3
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot goToJail', err)
      }
    },
    async doCommunityTask({ state, commit, dispatch }, { card }) {
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        const playerId = copyBoard.currPLayer._id
        const playerIdx = copyBoard.players.findIndex(
          (player) => player._id === playerId
        )

        switch (card._id) {
          case 'community-101': // Advance to "Go". (Collect $200)
            console.log('community-101')
            await dispatch({ type: 'doSteps', newPosition: 0 })
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
            copyBoard = JSON.parse(JSON.stringify(state.board))
            let homeCount = 0
            let hotelCount = 0
            copyBoard.players[playerIdx].propertyCards.forEach((card) => {
              if (card.houses > 4) hotelCount++
              if (card.houses < 5) homeCount += card.houses
            })
            copyBoard.players[playerIdx].balance -= homeCount * 40
            copyBoard.players[playerIdx].balance -= hotelCount * 115
            await boardService.save(copyBoard)
            commit({ type: 'setBoard', board: copyBoard })
            break
          case 'community-116': // Go to Jail
            console.log('community-116')
            await dispatch({ type: 'goToJail', playerIdx })
            break
          default:
          // some code
        }
      } catch (err) {
        console.log('cannot doCommunityTask', err)
      }
    },
    async buyHouse({ state, commit, dispatch }, { cardId, playerIdx }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      const cardIdx = copyBoard.players[playerIdx].propertyCards.findIndex(
        (card) => cardId === card._id
      )
      const cardPlayer = copyBoard.players[playerIdx].propertyCards[cardIdx]
      const hasHotel = cardPlayer.houses === 5
      const hasHouses = cardPlayer.houses > 4
      if (hasHotel) {
        console.log('you allready have hotel ')
        return
      } else if (hasHouses) {
        copyBoard.players[playerIdx].balance -= cardPlayer.hotelCost
      } else {
        copyBoard.players[playerIdx].balance -= cardPlayer.houseCost
      }
      cardPlayer.houses++
      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
    },
    async payRent({ state, commit, dispatch }, { currTile }) {
      let copyBoard = JSON.parse(JSON.stringify(state.board))
      const ownerId = currTile.owner._id
      const ownerIdx = copyBoard.players.findIndex(
        (player) => player._id === ownerId
      )
      let playerId = copyBoard.currPLayer._id
      const playerIdx = copyBoard.players.findIndex(
        (player) => player._id === playerId
      )
      let amountToPay
      let card

      if (currTile.type === 'railroad') {
        const cardIdx = copyBoard.players[ownerIdx].railroadsCards.findIndex(
          (card) => {
            return card.title === currTile.name
          }
        )
        const quantityOfCards =
          copyBoard.players[ownerIdx].railroadsCards.length
        card = copyBoard.players[ownerIdx].railroadsCards[cardIdx]

        if (quantityOfCards === 1) amountToPay = card.rent
        else if (quantityOfCards === 2) amountToPay = card.ifTwoCards
        else if (quantityOfCards === 3) amountToPay = card.ifthreeCards
        else if (quantityOfCards === 4) amountToPay = card.ifFourCards
      }
      //
      else if (currTile.type === 'city') {
        const cardIdx = copyBoard.players[ownerIdx].propertyCards.findIndex(
          (card) => {
            return card.title === currTile.name
          }
        )
        card = copyBoard.players[ownerIdx].propertyCards[cardIdx]

        if (card.houses === 0) amountToPay = card.rent
        else if (card.houses === 1) amountToPay = card.oneHouse
        else if (card.houses === 2) amountToPay = card.twoHouses
        else if (card.houses === 3) amountToPay = card.threeHouses
        else if (card.houses === 4) amountToPay = card.fourHouses
      }
      //
      else if (currTile.type === 'utility') {
        const cardIdx = copyBoard.players[ownerIdx].utilitiesCards.findIndex(
          (card) => {
            return card.title === currTile.name
          }
        )
        const quantityOfCards =
          copyBoard.players[ownerIdx].utilitiesCards.length

        card = copyBoard.players[ownerIdx].utilitiesCards[cardIdx]
        if (quantityOfCards === 1) {
          return await dispatch({
            type: 'payByDice',
            times: 4,
            payTo: copyBoard.players[ownerIdx],
          })
        } else if (quantityOfCards === 2) {
          return await dispatch({
            type: 'payByDice',
            times: 10,
            payTo: copyBoard.players[ownerIdx],
          })
        }
        return
      }

      copyBoard.players[playerIdx].balance -= amountToPay
      copyBoard.players[ownerIdx].balance += amountToPay

      await boardService.save(copyBoard)
      commit({ type: 'setBoard', board: copyBoard })
      return amountToPay
    },
    async getOutOfJail({ state, commit, dispatch }, { playerIdx }) {
      console.log('get out jail', playerIdx)
      try {
        let copyBoard = JSON.parse(JSON.stringify(state.board))
        // copyBoard.currDice = null
        copyBoard.doubleCount = 0

        copyBoard.players[playerIdx].isInJail = 0
        await boardService.save(copyBoard)
        commit({ type: 'setBoard', board: copyBoard })
      } catch (err) {
        console.log('cannot getOutOfJail', err)
      }
    },
  },
}
