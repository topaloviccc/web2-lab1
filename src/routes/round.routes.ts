import express from "express";
import {
	newRound,
	closeRound,
	storeResults,
} from "../controllers/round.controller.js";
import { requiresM2MToken } from "../middleware/middlewareM2M.js";

const router = express.Router();

router.route("/new-round").post(requiresM2MToken, newRound);
router.route("/close").post(requiresM2MToken, closeRound);
router.route("/store-results").post(requiresM2MToken, storeResults);

export default router;
