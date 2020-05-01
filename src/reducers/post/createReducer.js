export const createReducer = (state, payload) => {
  const { title, content, user } = payload

  const post = {
    id: Math.random(),
    title, 
    content,
    author: {
      id: user.id,
      email: user.email
    }
  }

  return [...state, post]
}