export const signupReducer = (state, payload, users) => {
  const { username, password } = payload

  // return undefined if user already exists
  if (users.find(user => user.username === username)) return

  // create a user
  const user = {
    id: Math.random(),
    username, password
  }

  // add the user to users
  users.push(user)

  // log in with new user
  return { loggedIn: true, user }
}
