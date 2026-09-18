import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Field, FieldLabel } from '../../../components/ui/field'
import { Input } from '../../../components/ui/input'

export default function InputPassword({
	registration,
	error
}: {
	registration: UseFormRegisterReturn
	error?: string
}) {
	const [visible, setVisible] = useState(false)
	return (
		<Field>
			<FieldLabel
				htmlFor="password"
				className="relative top-25 left-10 text-[15px] font-mono"
			>
				Password
			</FieldLabel>
			<Input
				type={visible ? 'text' : 'password'}
				placeholder="Password"
				{...registration}
				className="relative top-25 left-10 font-mono w-85!"
			/>
			{error && <span className="text-red-500 text-sm">{error}</span>}
			<button
				type="button"
				onClick={() => setVisible(!visible)}
				className="relative top-16.5 left-87"
			>
				{visible ? <EyeOff size={20} /> : <Eye size={20} />}
			</button>
		</Field>
	)
}
