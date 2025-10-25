function validateForm(event) {
	const document_no = document.getElementById("document_no");
	const numbers = document.getElementById("numbers");

	document_no.setCustomValidity("");
	numbers.setCustomValidity("");

	const numbersList = numbers.value
		.split(",")
		.map((n) => parseInt(n.trim(), 10));

	if (numbersList.length < 6) {
		numbers.setCustomValidity("Potrebno unijeti barem 6 brojeva");
	} else if (numbersList.length > 10) {
		numbers.setCustomValidity("Potrebno unijeti manje od 10 brojeva");
	} else if (
		!numbersList.every((n) => Number.isInteger(n) && n >= 1 && n <= 45)
	) {
		numbers.setCustomValidity("Potrebno unijeti brojeve između 1 i 45");
	} else if (new Set(numbersList).size != numbersList.length) {
		numbers.setCustomValidity(
			"Nije dozvoljen unos duplikata među brojevima"
		);
	}

	if (document_no.value.length > 20) {
		document_no.setCustomValidity(
			"Predugačak broj osobne iskaznice ili putovnice"
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const document_no = document.getElementById("document_no");
	const numbers = document.getElementById("numbers");
	document.getElementById("form").addEventListener("submit", (event) => {
		event.target.reportValidity();
	});
	document_no.addEventListener("input", validateForm);
	numbers.addEventListener("input", validateForm);
});
