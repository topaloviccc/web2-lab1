import { Request, Response } from "express";
import { createTicket, findTicket } from "../repositories/ticket.repository.js";
import {
	getCurrentRound,
	getRoundById,
} from "../repositories/round.repository.js";
import QRCode from "qrcode";
import { generateQRCode } from "../helper/generateQRCode.js";
import { externalUrl, port } from "../config/config.js";

export async function getPlayTicket(req: Request, res: Response) {
	try {
		const current_round = await getCurrentRound();
		res.render("play-ticket", { current_round });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function createQRTicket(req: Request, res: Response) {
	try {
		const current_round = await getCurrentRound();
		let ticket = null;
		if (current_round) {
			const numbersList = req.body.numbers
				.split(",")
				.map((n: string) => parseInt(n.trim(), 10));

			ticket = await createTicket(
				req.body.document_no,
				numbersList,
				current_round.id
			);
		}

		const baseURL = externalUrl || `https://localhost:${port}`;
		const ticketURL = `${baseURL}/ticket/${ticket.id}`;

		const qr = await generateQRCode(ticketURL);
		res.redirect(`/play-ticket/qr:${ticket.id}`);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function getQRTicket(req: Request, res: Response) {
	try {
		const ticketId = req.params.id;
		const baseURL = externalUrl || `https://localhost:${port}`;
		const ticketURL = `${baseURL}/ticket/${ticketId}`;

		const qr = await generateQRCode(ticketURL);
		res.render("ticket-qr", { qrCode: qr });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}

export async function getTicket(req: Request, res: Response) {
	try {
		const ticketId = req.params.id;
		const ticket = await findTicket(ticketId);
		const ticketRound = await getRoundById(ticket.round_id);
		res.render("ticket", { ticket, ticketRound });
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
}
