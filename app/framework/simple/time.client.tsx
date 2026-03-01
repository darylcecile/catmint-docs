import { useState } from "react";

export function ClientTime() {
	const [time, setTime] = useState(new Date().toISOString());

	function updateTime() {
		setTime(new Date().toISOString());
	}

	return (
		<div>
			<p>Client time: {time}</p>
			<button onClick={updateTime} className="border rounded bg-amber-200 p-2">Update Time</button>
		</div>
	)
}