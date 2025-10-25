import { Request, Response } from "express";
import {
	createNewRound,
	getCurrentRound,
	deactivateRound,
	storeRoundResults,
} from "../repositories/round.repository.js";

export async function newRound(req: Request, res: Response) {
	// prije otvaranja novog rounda, treba li osigurati da su brojevi izvučeni za stari???
	try {
		const current_round = await getCurrentRound();
		if (current_round && current_round.is_active == true) {
			res.sendStatus(204);
		} else if (current_round && current_round.is_active == false) {
			if (current_round.drawn_numbers) {
				await createNewRound();
				res.sendStatus(200);
			} else {
				res.sendStatus(204);
			}
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function closeRound(req: Request, res: Response) {
	try {
		const current_round = await getCurrentRound();
		if (current_round == null || current_round.is_active == false) {
			res.sendStatus(204);
		} else {
			await deactivateRound();
			res.sendStatus(200);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function storeResults(req: Request, res: Response) {
	try {
		const current_round = await getCurrentRound();
		const drawn_numbers = req.body.numbers;
		if (
			current_round == null ||
			current_round.drawn_numbers != null ||
			current_round.is_active
		) {
			res.sendStatus(400);
		} else {
			await storeRoundResults(current_round.id, drawn_numbers);
			res.sendStatus(204);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}
