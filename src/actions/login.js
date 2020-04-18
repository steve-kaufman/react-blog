export const login = (username, password) => ({
  type: 'login',
  payload: { username, password }
})