import { ClientTime } from './time.client';


export default function Page() {
	const serverTime = new Date().toISOString();
	return (
		<div>
			<p>Hello World</p>
			<p>Server time: {serverTime}</p>
			<ClientTime />
		</div>
	)
}