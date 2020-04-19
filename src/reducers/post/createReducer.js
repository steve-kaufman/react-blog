export const createReducer = (state, payload) => {
  const { title, content, user } = payload

  const post = {
    id: Math.random(),
    title, 
    content,
    author: {
      id: user.id,
      username: user.username
    }
  }

  return [...state, post]
}