import type React from 'react'
import AutoComplete from 'react-autocomplete'
import { GameSubjects } from '../../constants'
import type { UseSubject } from '../../hooks/useSubject'
import type { ISubjects } from '../../types'
import { classes, st } from './SelectSubject.st.css'

interface Props {
    subject: ReturnType<UseSubject>['subject']
    setSubject: ReturnType<UseSubject>['setSubject']
}

const subjects: ISubjects[] = Object.values(GameSubjects).map((value) => ({ value }))

export const SelectSubject: React.FC<Props> = ({ setSubject, subject }) => (
	<div className={st(classes.root)}>
		<AutoComplete
			value={subject}
			autoHighlight
			selectOnBlur
			onSelect={(value: string) => void setSubject(value)}
			onChange={(_, value: string) => void setSubject(value)}
			items={subjects.filter(
				(item) =>
					!subject ||
                    item.value.toLowerCase().includes(subject.toLowerCase())
			)}
			getItemValue={(item: ISubjects) => item.value}
			renderItem={(item: ISubjects, highlight: boolean) => (
				<div key={item.value} className={st(classes.item, { highlight })}>
					{item.value}
				</div>
			)}
		/>
	</div>
)
