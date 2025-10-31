import express from "express";
import { createTicketType, getTicketTypesByEvent } from "../controllers/ticketTypeController.mjs";

const router = express.Router();

router.post("/", createTicketType);
router.get("/:eventId", getTicketTypesByEvent);

export default router;