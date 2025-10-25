export class Round {
	id: number;
	is_active: boolean;
	drawn_numbers: number[] | null;

	constructor(
		id: number,
		is_active: boolean,
		drawn_numbers: number[] | null
	) {
		this.id = id;
		this.is_active = is_active;
		this.drawn_numbers = drawn_numbers;
	}
}
