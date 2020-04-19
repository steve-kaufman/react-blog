export const signup = (username, password) => ({
  type: 'signup',
  payload: { username, password }
})