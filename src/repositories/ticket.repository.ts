import db from "../config/db.config.js";

export async function createTicket(
	document_no: string,
	numbers: number[],
	round_id: number
) {
	const result = await db.query(
		"INSERT INTO ticket (round_id, document_no, numbers) VALUES ($1, $2, $3) RETURNING *",
		[round_id, document_no, numbers]
	);

	const ticket = result.rows[0];
	// const baseURL = "http://localhost:3000"; // env !! alo kuci
	// const ticketURL = `${baseURL}/ticket/${ticket.id}`;

	// return QRCode.toDataURL(ticketURL);
	return ticket;
}
