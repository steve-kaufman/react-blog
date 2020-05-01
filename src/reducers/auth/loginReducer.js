import api from '../../api'

export const loginReducer = (state, payload, initialState) => {
  const fetchingState = { ...initialState, status: 'fetching' }
  api.authenticate(payload).then(login => {
    fetchingState.login = login
  })
  return fetchingState
}