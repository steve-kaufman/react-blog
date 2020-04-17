export const updatePost = (id, title, content) => ({
  type: 'update',
  payload: { id, title, content }
})