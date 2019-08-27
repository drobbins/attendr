input = document.getElementById("in")


const go = document.getElementById("go");

let getRecords = () => {
	input = document.getElementById("in").value
	records = input.split("\n\n") // Blank line = two successive newlines.
	// console.log(records);
	// console.log(records[0].split("\n")[1].slice(1,-1));
	return records.map((record) => {
		lines = record.split("\n");
		return {
			id: lines[1].slice(1,-1),
			timestamp: new Date(lines[0].slice(0,-1))
		}
	});
}

let postRecords = (records) => {
	const out = document.getElementById("out")
	records.forEach((record) => {
		const row = out.insertRow();

		const timeCell = row.insertCell();
		const timeText = document.createTextNode(record.timestamp.toLocaleDateString());
		timeCell.appendChild(timeText);

		const idCell = row.insertCell();
		const idText = document.createTextNode(record.id);
		idCell.appendChild(idText);
	})
}

go.addEventListener("click", (e) => {
	records = getRecords();
	console.log(records);
	postRecords(records);
});