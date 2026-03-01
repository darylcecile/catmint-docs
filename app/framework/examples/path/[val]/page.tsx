

export default async function Page({params}: { params: { val: string } }) {
	return (
		<p>Hello {params.val}</p>
	)
}