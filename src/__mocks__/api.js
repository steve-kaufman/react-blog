const remove = jest.fn()
const create = jest.fn()
const get = jest.fn()

const service = jest.fn(() => ({ remove, create, get }))

export default {
  remove, create, get, service
}