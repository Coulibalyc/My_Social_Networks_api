import express from 'express';
import Groups from '../controllers/groupController.mjs';

const router = express.Router();

// On crée une instance du contrôleur et on lui passe "router" au lieu de "app"
new Groups(router);

export default router;
