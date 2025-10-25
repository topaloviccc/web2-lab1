import express from "express";
import {
	newRound,
	closeRound,
	storeResults,
} from "../controllers/round.controller.js";

const router = express.Router();

router.route("/new-round").post(newRound);
router.route("/close").post(closeRound);
router.route("/store-results").post(storeResults);

export default router;
