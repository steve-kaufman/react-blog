import feathers from '@feathersjs/client'
import io from 'socket.io-client'

// Use production api if serving from production server
const url = (process.env.PUBLIC_URL === '/react-blog/')
  ? 'https://steve-kaufman.com:9000'
  : `${window.location.hostname}:3030`

/* feathers.js boilerplate */
const socket = io(url)
const api = feathers()

api.configure(feathers.socketio(socket))
api.configure(feathers.authentication({
  storage: window.localStorage
}))

export default api
