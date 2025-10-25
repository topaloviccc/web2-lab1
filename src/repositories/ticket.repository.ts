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
	return ticket;
}

export async function findTicket(id: string) {
	const result = await db.query("SELECT * FROM ticket WHERE id=$1", [id]);
	const ticket = result.rows[0];
	return ticket;
}
