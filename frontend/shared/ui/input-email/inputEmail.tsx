import { Mail } from 'lucide-react'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'
import { InputEmailProps } from '../../../features/auth-by-email/model/interfaces/InputEmailProps'

export default function InputEmail({ value, onChange }: InputEmailProps) {
	return (
		<Field>
			<FieldLabel
				htmlFor="email"
				className="relative top-25 left-10 text-[15px] font-mono"
			>
				Email
			</FieldLabel>
			<Input
				value={value}
				onChange={e => onChange(e.target.value)}
				type="email"
				placeholder="Email"
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
