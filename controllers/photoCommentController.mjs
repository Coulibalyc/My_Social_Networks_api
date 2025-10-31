import PhotoComment from "../models/photoComment.mjs";

export const addComment = async (req, res) => {
  try {
    const comment = new PhotoComment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCommentsByPhoto = async (req, res) => {
  try {
    const comments = await PhotoComment.find({ photo: req.params.photoId })
      .populate("author", "name email");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};