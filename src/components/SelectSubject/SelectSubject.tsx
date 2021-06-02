import type React from 'react'
import AutoComplete from 'react-autocomplete'
import { GameSubjects } from '@constants'
import type { UseSubject } from '@hooks/useSubject'
import type { ISubjects } from '@types'
import { classes, st } from './SelectSubject.st.css'

export interface SelectSubjectProps {
    subject: ReturnType<UseSubject>['subject']
    setSubject: ReturnType<UseSubject>['setSubject']
}

const subjects: ISubjects[] = Object.values(GameSubjects).map((value) => ({
	value,
}))

export const ROOT_TEST_ID = 'SelectSubject'
export const INPUT_TEST_ID = 'SelectSubject_INPUT'
export const BASE_ITEM_TEST_ID = 'SelectSubject_ITEM'

export const getSubjectTestId = (item: GameSubjects) =>
	`${BASE_ITEM_TEST_ID}_${item}`

export const SelectSubject: React.FC<SelectSubjectProps> = ({
	setSubject,
	subject,
}) => (
	<div
		className={st(classes.root)}
		data-testid={ROOT_TEST_ID}
	>
		<AutoComplete
			renderInput={(props) => (
				<input
					{...props}
					data-testid={INPUT_TEST_ID}
				/>
			)}
			value={subject}
			autoHighlight
			selectOnBlur
			onSelect={(value: string) => void setSubject(value)}
			onChange={(_, value: string) => void setSubject(value)}
			items={subjects.filter(
				(item) =>
					!subject ||
                    item.value.toLowerCase().includes(subject.toLowerCase()),
			)}
			getItemValue={(item: ISubjects) => item.value}
			renderItem={(item: ISubjects, highlight: boolean) => (
				<div
					key={item.value}
					data-testid={getSubjectTestId(item.value)}
					className={st(classes.item, { highlight })}
				>
					{item.value}
				</div>
			)}
		/>
	</div>
)
