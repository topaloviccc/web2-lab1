import db from "../config/db.config.js";
import { Round } from "../models/round.model.js";

export async function getCurrentRound(): Promise<Round | null> {
	const result = await db.query<Round>(
		"SELECT * FROM round ORDER BY created_at DESC LIMIT 1;"
	);
	if (result.rows.length == 0) return null;
	const row = result.rows[0];
	return row;
}

export async function createNewRound() {
	await db.query("UPDATE round SET is_active=False");
	const result = await db.query(
		"INSERT INTO round (id, is_active, drawn_numbers, created_at) VALUES (default,default,default,default);"
	);
}

export async function deactivateRound() {
	await db.query("UPDATE round SET is_active=False");
}

export async function storeRoundResults(id: number, drawn_numbers: number[]) {
	await db.query("UPDATE round SET drawn_numbers=$1 WHERE id=$2", [
		drawn_numbers,
		id,
	]);
}

export async function getTicketNo(id: number) {
	const ticketNo = await db.query(
		"SELECT COUNT(*) AS tickets FROM ticket WHERE round_id=$1",
		[id]
	);
	return ticketNo.rows[0].tickets;
}
