import React, { ChangeEvent, useState } from 'react'
import AutoComplete from 'react-autocomplete'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { GameSubjects } from '../../constants'
import { classes, st } from './SelectSubject.st.css'



interface Props extends Omit<UseFormRegisterReturn, 'ref'> {
	value: string;
	className?: string
	required?: boolean
	placeholder: string
}

interface ISubjects {
	value: GameSubjects
}

export const SelectSubject = React.forwardRef<UseFormRegisterReturn['ref'], Props>(({
	name,
	onBlur,
	onChange: _onChange,
	value,
	className,
	placeholder,
	required
}, ref) => {
	const [selectedValue, setSelectedValue] = useState<string>(value)
	const subjects: ISubjects[] = [
		{
			value: GameSubjects.Food
		},
		{
			value: GameSubjects.Cars
		}
	]

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value)
		void _onChange(event)
	}

	return (
		<div className={st(classes.root)}>
			<AutoComplete
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				ref={ref}
				value={selectedValue}
				autoHighlight
				renderInput={(props) => <input {...{
					...props, ...{
						placeholder,
						className,
						onBlur,
						onChange,
						name,
						required,
						value: selectedValue
					}
				}} />}
				onSelect={setSelectedValue}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				onChange={(_, _value) => setSelectedValue(_value)}
				items={subjects.filter(item => !selectedValue || item.value.toLowerCase().includes(selectedValue.toLowerCase()))}
				getItemValue={(item: ISubjects) => item.value}
				renderItem={(item: ISubjects, highlight: boolean) => (
					<div key={item.value} className={st(classes.item, { highlight })}>
						{item.value}
					</div>
				)}
			/>
		</div>
	)
}
)