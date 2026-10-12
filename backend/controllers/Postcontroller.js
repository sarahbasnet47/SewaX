import {
  addpostservice,
  deleteallservices,
  getallpostservice,
  getmypostservices,
  getpostbyidservices,
  getpostbyslugservices,
  updatepostservices,
} from "../services/Postservice.js";

import { generateSlug } from "../utils/sluggenerator.js";

export const createPost = async (req, res) => {
  const id = Number(req.user.id);
  const { title, description, location, budget } = req.body || {};
  try {
    const generatedslug = generateSlug(title);
    const post = await addpostservice(
      generatedslug,
      id,
      title,
      description,
      location,
      budget,
    );
    if (post.affectedRows == 0) {
      res.send({ message: "post not created" });
    }

    res.status(201).json({ message: "service post successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getallservices = async (req, res) => {
  try {
    const result = await getgetallservicesservice();
    if (!result) {
      return res.status(404).json({ message: "service not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.send("something went wrong");
  }
};
export const getmypost = async (req, res) => {
  try {
    const userid = req.user.id;
    const mypost = await getmypostservices(userid);
    if (!mypost || mypost === 0) {
      return res.status(404).json({
        message: "you have no post",
      });
    }
    res.status(200).json({
      message: "post fetched successfully",
      mypost,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
export const deletepost = async (req, res) => {
  try {
    const id = Number(req.params.postid);
    const result = await deleteallservices(id);

    if (result[0].affectedRows === 0) {
      res.status(404).json({ message: "post not found" });
    }
    res.json({ message: "post deleted successfully" });
  } catch (error) {
    res.send({ message: "something went wrong" });
  }
};
export const updatepost = async (req, res) => {
  try {
    const postid = Number(req.params.id);
    const { title, description, location, budget } = req.body || {};
    const updatepost = await updatepostservices(
      title,
      description,
      location,
      budget,
      postid,
    );
    if (updatepost.affectedRows === 0) {
      return res.status(400).json({ message: "unable to update post" });
    }
    return res.status(200).json({ message: "update post successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const getpostbyid = async (req, res) => {
  try {
    const postid = Number(req.params.id);
    const post = await getpostbyidservices(postid);
    if (post.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }
    return res
      .status(200)
      .json({ message: "post fetched successfully", post: post[0] });
  } catch (error) {
    res.status(500).json({ message: "sopmething went wrong" });
  }
};
export const getpostbyslug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await getpostbyslugservices(slug);
    if (post.length === 0) {
      return res.status(404).json({ message: "post not found" });
    }
    return res
      .status(200)
      .json({ mesage: "post fetched successfully", post: post[0] });
  } catch (error) {
    res.status(500).json({ message: "spomething went wrong" });
  }
};
export const getallpost = async (req, res) => {
  try {
    const allPosts = await getallpostservice();

    return res.status(200).json({
      message: "Posts retrieved successfully",
      allPosts,
    });
  } catch (error) {
    console.error("Get all posts error:", error);

    return res.status(500).json({
      message: "Failed to retrieve posts",
    });
  }
};