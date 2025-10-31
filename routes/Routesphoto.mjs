import express from "express";
import { createAlbum, getAlbums, getAlbumById, deleteAlbum } from "../controllers/albumController.mjs";
import { addPhoto, getPhotosByAlbum, deletePhoto } from "../controllers/photoController.mjs";
import { addComment, getCommentsByPhoto } from "../controllers/photoCommentController.mjs";

const router = express.Router();

// Albums
router.post("/albums", createAlbum);
router.get("/albums", getAlbums);
router.get("/albums/:id", getAlbumById);
router.delete("/albums/:id", deleteAlbum);

// Photos
router.post("/albums/:albumId/photos", addPhoto);
router.get("/albums/:albumId/photos", getPhotosByAlbum);
router.delete("/photos/:id", deletePhoto);

// Comments
router.post("/photos/:photoId/comments", addComment);
router.get("/photos/:photoId/comments", getCommentsByPhoto);

export default router;