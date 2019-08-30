const go = document.getElementById("go");

let getRecords = () => {
	input = document.getElementById("in").value.trim() 	// Remove extra blank space from input.
	records = input.split("\n\n")						// Blank line = two successive newlines
	return records.map((record) => { 					// Create record objects
		lines = record.split("\n");
		return {
			id: lines[1].slice(1,-1),
			datetime: new Date(lines[0].slice(0,-1)),
			timestamp: lines[0].slice(0,-1)
		}
	});
}

let postRecords = (records) => {
	const out = document.getElementById("out")
	const warnings = []
	records.forEach((record) => {
		const row = out.insertRow();

		const idCell = row.insertCell();
		const idText = document.createTextNode(record.id);
		idCell.appendChild(idText);

		const dateCell = row.insertCell();
		const dateText = document.createTextNode(record.datetime.toLocaleDateString());
		dateCell.appendChild(dateText);

		const timestampCell = row.insertCell();
		const timestampText = document.createTextNode(record.timestamp.slice(11));
		timestampCell.appendChild(timestampText);

		if (!record.id.startsWith("900")) {
			row.style["background-color"] = "gold";
			warnings.push(record);
		}
	})
	return warnings;
}

let placeDownloadLink = (records) => {
	// csvRecords = records.map( r => Object.values(r).join(",") )
	csvRecords = records.map( r => [r.id, r.datetime.toLocaleDateString(), r.timestamp.slice(11)].join(",") )
	console.log(csvRecords)
	downloadableCSV = `data:text/plain;charset=utf-8, ${encodeURIComponent(csvRecords.join("\n"))}`

	downloadLink = document.getElementById("csv")
	downloadLink.innerText = "Download as CSV"
	downloadLink.href = downloadableCSV
}

document.getElementById("clear").addEventListener("click", e => {
	document.getElementById("in").value = ""
	const out = document.getElementById("out")
	while (out.firstChild) { out.removeChild(out.firstChild) }

	downloadLink = document.getElementById("csv")
	downloadLink.innerText = ""
	downloadLink.href = ""

	document.getElementById("msg").innerText = ""
})

go.addEventListener("click", (e) => {
	const start = Date.now()
	records = getRecords();
	const warnings = postRecords(records);
	placeDownloadLink(records);
	const end = Date.now()
	document.getElementById("msg").innerText = `Processed ${records.length} records in ${(end-start)/1000} seconds.${ warnings.length ? ` ${warnings.length} Warnings.` : ""}`
});
