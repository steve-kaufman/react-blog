export const updateReducer = (state, payload) => {
  const { id, title, content } = payload

  return state.map(post => {
    if (post.id === id) {
      return { ...post, title, content }
    }
    return post
  });
}