import { constants } from "http2";
import {
  insertPost,
  getPosts,
  getPostById,
  getPostsByAuthorUsername,
  doesPostExist,
  getPostAuthorId,
  updatePostById,
} from "../models/postModel.js";
import { isUserAnAuthor } from "../models/userModel.js";

const createPost = async (req, res) => {
  const isCurrentUserAnAuthor = await isUserAnAuthor(req.user.id);
  if (!isCurrentUserAnAuthor) {
    return res
      .status(constants.HTTP_STATUS_FORBIDDEN)
      .json({ message: "You do not have the permission to create posts" });
  }

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
  const { username } = req.params;
  const posts = await getPostsByAuthorUsername(username);

  if (posts) {
    return res.json({
      message: `Here's all the posts for Author - ${username}`,
      posts,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't get posts for that author" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const postId = await doesPostExist(id);
  if (!postId) {
    return res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: "That post doesn't exist" });
  }

  const authorId = await getPostAuthorId(postId);
  if (authorId) {
    if (authorId != req.user.id) {
      return res
        .status(constants.HTTP_STATUS_FORBIDDEN)
        .json({ message: "You can't update another user's post" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Unable to update this post" });
  }

  const post = await updatePostById(postId, title, body);
  if (post) {
    return res.json({
      message: "Updated post",
      post,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't update this post" });
  }
};

export { createPost, getAllPosts, getPost, getAuthorPosts, updatePost };
