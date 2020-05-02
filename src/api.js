import feathers from '@feathersjs/client'
import io from 'socket.io-client'

const url = (process.env.PUBLIC_URL === '/react-blog/')
  ? 'https://steve-kaufman.com:9000'
  : 'http://localhost:3030'

const socket = io(url)
const api = feathers()

api.configure(feathers.socketio(socket))
api.configure(feathers.authentication({
  storage: window.localStorage
}))

export default api
