export const signup = (email, password) => ({
  type: 'signup',
  payload: { email, password }
})