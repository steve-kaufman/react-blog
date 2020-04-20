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
  console.log(post)

  const queryResult = await context.app.service('likes').find({ query: {
    postId: post.id
  } })

  let likes = 0
  let dislikes = 0

  queryResult.data.forEach(likeObj => {
    if (likeObj.like) {
      likes++
    } else {
      dislikes++
    }
  });

  return [likes, dislikes]
}

module.exports = (options = {}) => {
  return async context => {
    // if this is a find request, do all results, else do single result
    if (Array.isArray(context.result.data)) {
      for (const post of context.result.data) {
        console.log(post)
        const [likes, dislikes] = await getLikes(context, post)

        post.likes = likes
        post.dislikes = dislikes
      }
    } else {
      const [likes, dislikes] = await getLikes(context, context.result)

      context.result.likes = likes
      context.result.dislikes = dislikes
    }

    return context;
  };
};
