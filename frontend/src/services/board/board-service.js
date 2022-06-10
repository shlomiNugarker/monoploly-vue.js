import { utilService } from '../util.service'
// import { httpService } from '../http.service'
import { storageService } from '../async-storage.service'

const KEY = 'board_db'

const ENDPOINT = 'board'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/board' : '//localhost:3030/api/board/'

export const boardService = {
  query,
  getById,
  remove,
  save,
  getEmptyBoard,
}

const gBoards = _createBoards()

async function query(filterBy = {}) {
  // return await httpService.get(ENDPOINT, filterBy)
  return storageService.query(KEY)
}

async function getById(id) {
  // return await httpService.get(`${ENDPOINT}/${id}`)
  return storageService.getById(KEY, id)
}

async function remove(id) {
  // return await httpService.delete(`${ENDPOINT}/${id}`)
  return storageService.remove(KEY, id)
}

async function save(board) {
  // return board._id
  //   ? await httpService.put(`${ENDPOINT}/${board._id}`, board)
  //   : await httpService.post(ENDPOINT, board)
  return board._id
    ? storageService.put(KEY, board)
    : storageService.post(KEY, board)
}

function getEmptyBoard() {
  return Promise.resolve({
    name: 'Empty-board',
    createdAt: new Date(),
    description: utilService.getLoremIpsum(),
  })
}

function _createBoards() {
  let boards = utilService.loadFromStorage(KEY)
  if (!boards || !boards.length) {
    boards = [
      _createBoard('Board-1'),
      _createBoard('Board-2'),
      _createBoard('Board-4'),
      _createBoard('Board-5'),
      _createBoard('Board-6'),
      _createBoard('Board-7'),
      _createBoard('Board-8'),
      _createBoard('Board-9'),
      _createBoard('Board-10'),
      _createBoard('Board-11'),
    ]
    utilService.saveToStorage(KEY, boards)
  }
  return boards
}

function _createBoard(name) {
  return {
    _id: utilService.makeId(),
    name,
    description: utilService.getLoremIpsum(),
    createdAt: new Date(),
  }
}
