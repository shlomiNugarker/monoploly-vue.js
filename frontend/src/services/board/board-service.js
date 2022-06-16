import { utilService } from '../util.service'
// import { httpService } from '../http.service'
import { storageService } from '../async-storage.service'

const KEY = 'board_db'

const ENDPOINT = 'board'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/board' : '//localhost:3030/api/board/'

export const boardService = {
  query,
  getBoardById,
  remove,
  save,
  getNewBoard,
}

const gBoards = _createBoards()

async function query(filterBy = {}) {
  // return await httpService.get(ENDPOINT, filterBy)
  return storageService.query(KEY)
}

async function getBoardById(boardId) {
  console.log('boa')
  // return await httpService.get(`${ENDPOINT}/${boardId}`)
  return storageService.getById(KEY, boardId)
}

async function remove(boardId) {
  // return await httpService.delete(`${ENDPOINT}/${boardId}`)
  return storageService.remove(KEY, boardId)
}

async function save(board) {
  // return board._id
  //   ? await httpService.put(`${ENDPOINT}/${board._id}`, board)
  //   : await httpService.post(ENDPOINT, board)
  return board._id
    ? storageService.put(KEY, board)
    : storageService.post(KEY, board)
}

function getNewBoard() {
  return Promise.resolve({
    name: 'New-board',
    createdAt: new Date(),
  })
}

function _createBoards() {
  let boards = utilService.loadFromStorage(KEY)
  if (!boards || !boards.length) {
    boards = [_createBoard('Board-1')]
    utilService.saveToStorage(KEY, boards)
  }
  return boards
}

function _createBoard(name) {
  return {
    _id: 'b101',
    title: name,
    createdAt: new Date(),
    players: [
      {
        _id: 'p100',
        name: 'player-0',
        position: 0,
        propertyCards: [],
        balance: 2000,
        colorToken: 'blue',
      },
      {
        _id: 'p101',
        name: 'player-1',
        position: 0,
        propertyCards: [],
        balance: 2000,
        colorToken: '#409eff',
      },
    ],
    tiles: [
      {
        name: 'Go',
        players: [
          {
            _id: 'p100',
            name: 'player-0',
            position: 0,
            propertyCards: [],
            balance: 2000,
            colorToken: 'blue',
          },
          {
            _id: 'p101',
            name: 'player-1',
            position: 0,
            propertyCards: [],
            balance: 2000,
            colorToken: '#409eff',
          },
        ],
        owner: null,
        price: 60,
        type: 'go',
      },
      {
        name: 'Mediterranean Avenue',
        players: [],
        owner: null,
        color: '#562e22',
        price: 60,
        type: 'city',
      },
      {
        name: 'Community chest',
        players: [],
        owner: null,
        color: '',
        type: 'CommunityChest',
      },
      {
        name: 'Baltic Avenue',
        players: [],
        owner: null,
        color: '#562e22',
        price: 60,
        type: 'city',
      },
      {
        name: 'Income tax',
        players: [],
        owner: null,
        color: '',
        price: 200,
        type: 'tax',
      },
      {
        name: 'Reading Railroad',
        players: [],
        owner: null,
        color: '',
        price: 200,
        type: 'company',
      },
      {
        name: 'Oriental Avenue',
        players: [],
        owner: null,
        color: '#95b8cb',
        price: 100,
        type: 'city',
      },
      {
        name: 'Chance',
        players: [],
        owner: null,
        type: 'chance',
      },
      {
        name: 'Vermont Avenue',
        players: [],
        owner: null,
        color: '#95b8cb',
        price: 100,
        type: 'city',
      },
      {
        name: 'Connecticut Avenue',
        players: [],
        owner: null,
        color: '#95b8cb',
        price: 120,
        type: 'city',
      },
      {
        name: 'jail',
        players: [],
        owner: null,
        type: 'visit',
      },
      {
        name: 'St. Charles Place',
        players: [],
        owner: null,
        color: '#cb5382',
        price: 140,
        type: 'city',
      },
      {
        name: 'Electric Company',
        players: [],
        owner: null,
        color: '',
        price: 140,
        type: 'company',
      },
      {
        name: 'States Avenue',
        players: [],
        owner: null,
        color: '#cb5382',
        price: 140,
        type: 'city',
      },
      {
        name: 'Virginia Avenue',
        players: [],
        owner: null,
        color: '#cb5382',
        price: 160,
        type: 'city',
      },
      {
        name: 'Pennsylvania Railroad',
        players: [],
        owner: null,
        color: '',
        price: 200,
        type: 'company',
      },
      {
        name: 'St. James Place',
        players: [],
        owner: null,
        color: '#ffa600',
        price: 100,
        type: 'city',
      },
      {
        name: 'Community chest',
        players: [],
        owner: null,
        type: 'CommunityChest',
      },
      {
        name: 'Tennessee Avenue',
        players: [],
        owner: null,
        color: '#ffa600',
        price: 180,
        type: 'city',
      },
      {
        name: 'New York Avenue',
        players: [],
        owner: null,
        color: '#ffa600',
        price: 200,
        type: 'city',
      },

      {
        name: 'Parking',
        players: [],
        owner: null,
        color: '',
        type: 'parking',
      },
      {
        name: 'Kentucky Avenue',
        players: [],
        owner: null,
        color: '#cf3b30',
        price: 220,
        type: 'city',
      },
      {
        name: 'Chance',
        players: [],
        owner: null,
        color: '',
        type: 'chance',
      },
      {
        name: 'Indiana Avenue',
        players: [],
        owner: null,
        color: '#cf3b30',
        price: 220,
        type: 'city',
      },
      {
        name: 'Illinois Avenue',
        players: [],
        owner: null,
        color: '#cf3b30',
        price: 240,
        type: 'city',
      },
      {
        name: 'B. & O. Railroad',
        players: [],
        owner: null,
        color: '',
        price: 200,
        type: 'company',
      },
      {
        name: 'Atlantic Avenue',
        players: [],
        owner: null,
        color: '#d3c11b',
        price: 260,
        type: 'city',
      },
      {
        name: 'Ventnor Avenue',
        players: [],
        owner: null,
        color: '#d3c11b',
        price: 260,
        type: 'city',
      },
      {
        name: 'Water  Works',
        players: [],
        owner: null,
        color: '',
        price: 100,
        type: 'company',
      },

      {
        name: 'Marvin Gardens',
        players: [],
        owner: null,
        color: '#d3c11b',
        price: 280,
        type: 'city',
      },
      {
        name: 'Send To Jail',
        players: [],
        owner: null,
        color: '',
        type: 'jail',
      },
      {
        name: 'Pacific Avenue',
        players: [],
        owner: null,
        color: '#0ab842',
        price: 300,
        type: 'city',
      },
      {
        name: 'North Carolina Avenue',
        players: [],
        owner: null,
        color: '#0ab842',
        price: 300,
        type: 'city',
      },
      {
        name: 'Community chest',
        players: [],
        owner: null,
        color: '',
        type: 'CommunityChest',
      },
      {
        name: 'Pennsylvania Avenue',
        players: [],
        owner: null,
        color: '#0ab842',
        price: 320,
        type: 'city',
      },
      {
        name: 'Short Line',
        players: [],
        owner: null,
        color: '',
        price: 200,
        type: 'company',
      },
      {
        name: 'Chance',
        players: [],
        owner: null,
        color: '',
        type: 'chance',
      },
      {
        name: 'Park Place',
        players: [],
        owner: null,
        color: '#2863ad',
        price: 350,
        type: 'city',
      },
      {
        name: 'Luxury Tax',
        players: [],
        owner: null,
        color: '',
        price: 75,
        type: 'tax',
      },
      {
        name: 'Boardwalk',
        players: [],
        owner: null,
        color: '#2863ad',
        price: 400,
        type: 'city',
      },
    ],
    cmpsOrder: [
      'startCmp',
      'tileCmp',
      'communityCmp',
      'tileCmp',
      'incomeCmp',
      'railroadCmp',
      'tileCmp',
      'chanceCmp',
      'tileCmp',
      'tileCmp',
      'jailCmp',
      'tileCmp',
      'electricCmp',
      'tileCmp',
      'tileCmp',
      'railroadCmp',
      'tileCmp',
      'communityCmp',
      'tileCmp',
      'tileCmp',
      'parkingCmp',
      'tileCmp',
      'chanceCmp',
      'tileCmp',
      'tileCmp',
      'railroadCmp',
      'tileCmp',
      'tileCmp',
      'waterWorkCmp',
      'tileCmp',
      'sendToJailCmp',
      'tileCmp',
      'tileCmp',
      'communityCmp',
      'tileCmp',
      'railroadCmp',
      'chanceCmp',
      'tileCmp',
      'luxuryTaxCmp',
      'tileCmp',
    ],
  }
}
