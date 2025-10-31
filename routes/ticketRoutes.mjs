import express from "express";
import { createTicket, getTicketsByType } from "../controllers/ticketController.mjs";

const router = express.Router();

router.post("/", createTicket);
router.get("/:ticketTypeId", getTicketsByType);

export default router;