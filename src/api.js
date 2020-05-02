import feathers from '@feathersjs/client'
import io from 'socket.io-client'

const socket = io('http://localhost:3030/')
const api = feathers()

api.configure(feathers.socketio(socket))
api.configure(feathers.authentication({
  storage: window.localStorage
}))

export default api
