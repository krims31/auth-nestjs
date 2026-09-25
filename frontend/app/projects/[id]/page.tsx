import { useParams } from 'next/navigation'

export default function ProjectId() {
	const params = useParams()

	return (
		<div>
			<h1>{params.id}</h1>
		</div>
	)
}