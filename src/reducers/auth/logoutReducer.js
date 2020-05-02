import api from '../../api'

export const logoutReducer = (initialState) => {
  api.logout()
  return initialState
}