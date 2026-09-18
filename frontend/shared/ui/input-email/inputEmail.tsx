import { AlertCircle, Mail } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputEmail({
	registration,
	error
}: {
	registration: UseFormRegisterReturn
	error?: string
}) {
	return (
		<div className="flex flex-col gap-1 mb-4">
			<Field>
				<FieldLabel
					htmlFor="email"
					className="relative top-20 left-10 text-[15px] font-mono"
				>
					Email
				</FieldLabel>
				<Input
					type="email"
					placeholder="Email"
					{...registration}
					className="relative top-20 left-10 font-mono w-85!"
				/>
				{error && (
					<span className="text-red-500 text-sm font-mono flex items-center gap-1">
						<AlertCircle size={14} />
						{error}
					</span>
				)}
				<button>
					<Mail
						size={20}
						className="relative top-11.5 left-87"
					/>
				</button>
			</Field>
		</div>
	)
}
