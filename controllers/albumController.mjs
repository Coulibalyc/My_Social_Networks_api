import Album from "../models/album.mjs";

export const createAlbum = async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("event createdBy");
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("event createdBy");
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json(album);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};