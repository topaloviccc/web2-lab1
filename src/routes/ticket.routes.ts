import express from "express";
import {
	createQRTicket,
	getPlayTicket,
	getTicket,
} from "../controllers/ticket.controller.js";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;

const router = express.Router();
router.route("/play-ticket").get(requiresAuth(), getPlayTicket);
router.route("/ticket-submit").post(requiresAuth(), createQRTicket);
router.route("/play-ticket/qr").get(requiresAuth(), createQRTicket);
router.route("/ticket/:id").get(requiresAuth(), getTicket);

export default router;
