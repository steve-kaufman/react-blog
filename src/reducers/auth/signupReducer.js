import api from '../../api'

export const signupReducer = async (state, payload) => {
  await api.service('users').create(payload)
  const login = await api.authenticate(payload)
  return login
}
