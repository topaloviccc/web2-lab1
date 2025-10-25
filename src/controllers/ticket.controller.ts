import { Request, Response } from "express";
import { createTicket } from "../repositories/ticket.repository.js";
import { getCurrentRound } from "../repositories/round.repository.js";

// export async function createQRTicket(req: Request, res: Response) {
// 	try {
// 		const current_round = await getCurrentRound();
// 		const ticket = await createTicket(recurrent_round.id);
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
