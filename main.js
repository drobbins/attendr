const go = document.getElementById("go");

let getRecords = () => {
	input = document.getElementById("in").value.trim() 	// Remove extra blank space from input.
	records = input.split("\n\n")						// Blank line = two successive newlines
	return records.map((record) => { 					// Create record objects
		lines = record.split("\n");
		return {
			id: lines[1].slice(1,-1),
			timestamp: new Date(lines[0].slice(0,-1))
		}
	});
}

let postRecords = (records) => {
	const out = document.getElementById("out")
	const warnings = []
	records.forEach((record) => {
		const row = out.insertRow();

		const timeCell = row.insertCell();
		const timeText = document.createTextNode(record.timestamp.toLocaleDateString());
		timeCell.appendChild(timeText);

		const idCell = row.insertCell();
		const idText = document.createTextNode(record.id);
		idCell.appendChild(idText);

		if (!record.id.startsWith("900")) {
			row.style["background-color"] = "gold";
			warnings.push(record);
		}
	})
	return warnings;
}

go.addEventListener("click", (e) => {
	const start = Date.now()
	records = getRecords();
	const warnings = postRecords(records);
	const end = Date.now()
	document.getElementById("msg").innerText = `Processed ${records.length} records in ${(end-start)/1000} seconds.${ warnings.length ? ` ${warnings.length} Warnings.` : ""}`
});
