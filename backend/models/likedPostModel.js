const insertLikedPost = async (postId, userId) => {
  try {
    const likedPost = await prisma.liked_post.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });
    return likedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertLikedPost };
