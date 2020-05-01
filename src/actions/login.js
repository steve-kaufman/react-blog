export const login = (email, password) => ({
  type: 'login',
  payload: { 
    strategy: 'local',
    email, 
    password 
  }
})