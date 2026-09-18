import { AlertCircle } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputUsername({
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
					htmlFor="username"
					className="relative top-20 left-10 text-[15px] font-mono"
				>
					Username
				</FieldLabel>
				<Input
					id="username"
					type="text"
					placeholder="Username"
					{...registration}
					className="relative top-20 left-10 font-mono w-85!"
				/>
				{error && (
					<span className="text-red-500 text-sm font-mono flex items-center gap-1">
						<AlertCircle size={14} />
						{error}
					</span>
				)}
			</Field>
		</div>
	)
}
