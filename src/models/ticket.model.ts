export class Ticket {
	id: string;
	round_id: number;
	document_no: string;
	numbers: number[];

	constructor(
		id: string,
		round_id: number,
		document_no: string,
		numbers: number[]
	) {
		this.id = id;
		this.round_id = round_id;
		this.document_no = document_no;
		this.numbers = numbers;
	}
}
