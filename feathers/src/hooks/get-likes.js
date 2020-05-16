// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

/**
 * Takes hook context and a post object,
 * returns number of likes and dislikes
 *
 * @param {any} context
 * @param {any} post
 */
const getLikes = async (context, post) => {
  // get collection of like objects for this post
  const queryResult = await context.app.service('likes').find({
    query: { postId: post.id }
  })

  // initialize counters
  let likes = 0
  let dislikes = 0

  if (post.id === 1) console.log(queryResult)

  queryResult.forEach(likeObj => {
    // if the like property is true, add to likes, else add to dislikes
    if (likeObj.like) {
      likes++
    } else {
      dislikes++
    }

    // if (likeObj.postId === 1) console.log(likeObj)

    // if not authenticated, don't check for user association
    if (!context.params.user) {
      console.log('not logged in')
      return
    }

    if (likeObj.postId === 1 && likeObj.userId === 13) {
      console.log('user 13 has liked post 1')
    }

    // if post was (dis)liked by authenticated user, add 'userLiked' field
    if (likeObj.userId === context.params.user.id) {
      post.userLiked = {
        id: likeObj.id,
        like: likeObj.like
      }
    }
  })

  return [likes, dislikes]
}

module.exports = (options = {}) => {
  return async context => {
    // if this is a find request, do all results, else do single result
    if (context.method === 'find') {
      for (const post of context.result.data) {
        const [likes, dislikes] = await getLikes(context, post)

        post.likes = likes
        post.dislikes = dislikes
      }
    } else {
      const [likes, dislikes] = await getLikes(context, context.result)

      context.result.likes = likes
      context.result.dislikes = dislikes
    }

    return context
  }
}
