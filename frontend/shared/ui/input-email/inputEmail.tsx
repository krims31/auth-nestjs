import { Mail } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputEmail({
	registration
}: {
	registration: UseFormRegisterReturn
}) {
	return (
		<Field>
			<FieldLabel
				htmlFor="email"
				className="relative top-25 left-10 text-[15px] font-mono"
			>
				Email
			</FieldLabel>
			<Input
				type="email"
				placeholder="Email"
				{...registration}
				className="relative top-25 left-10 font-mono w-85!"
			/>
			<button>
				<Mail
					size={20}
					className="relative top-16.5 left-87"
				/>
			</button>
		</Field>
	)
}
