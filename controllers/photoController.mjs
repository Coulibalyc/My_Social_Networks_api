import Photo from "../models/photo.mjs";

export const addPhoto = async (req, res) => {
  try {
    const photo = new Photo(req.body);
    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPhotosByAlbum = async (req, res) => {
  try {
    const photos = await Photo.find({ album: req.params.albumId })
      .populate("uploadedBy", "name email");
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: "Photo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};