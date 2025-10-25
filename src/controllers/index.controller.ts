import { Request, Response } from "express";
import {
	getCurrentRound,
	getTicketNo,
} from "../repositories/round.repository.js";

export async function getIndex(req: Request, res: Response) {
	try {
		const current_round = await getCurrentRound();
		const drawn_numbers = current_round?.drawn_numbers;
		const is_active = current_round?.is_active;

		let noOfTickets = null;
		if (current_round) {
			noOfTickets = await getTicketNo(current_round.id);
		}

		const user = req.oidc.user;

		res.render("index", {
			user,
			isAuthenticated: req.oidc.isAuthenticated(),
			current_round,
			noOfTickets,
			drawn_numbers,
			is_active,
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}
