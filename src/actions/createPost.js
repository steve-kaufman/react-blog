export const createPost = (title, content, user) => ({
  type: 'create',
  payload: { title, content, user }
})