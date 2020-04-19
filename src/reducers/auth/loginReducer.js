export const loginReducer = (state, payload, users) => {
  const { username, password } = payload

  // find user with given username
  const user = users.find(user => user.username === username)

  // return undefined if user doesn't exist
  if (!user) return
  // return undefined if password doesn't match
  if (password !== user.password) return

  // log in
  return { loggedIn: true, user }
}