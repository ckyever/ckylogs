import { constants } from "http2";
import {
  insertPost,
  getPosts,
  getPostById,
  getPostsByAuthorId,
} from "../models/postModel.js";

const createPost = async (req, res) => {
  const { title, body } = req.body;

  if (title && body) {
    const newPost = await insertPost(title, body, req.user.id);
    if (newPost) {
      return res.json({ message: "Post has been created", post: newPost });
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "We couldn't create your post" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing something" });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await getPosts();

  if (posts) {
    return res.json({ message: "Here's all the posts", posts });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't get posts" });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await getPostById(id);

  if (post) {
    return res.json({ message: `Here's the post for ID - ${id}`, post });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't get that post" });
  }
};

const getAuthorPosts = async (req, res) => {
  const { id } = req.params;
  const posts = await getPostsByAuthorId(id);

  if (posts) {
    return res.json({
      message: `Here's all the posts for Author ID - ${id}`,
      posts,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't get posts for that author" });
  }
};

export { createPost, getAllPosts, getPost, getAuthorPosts };
