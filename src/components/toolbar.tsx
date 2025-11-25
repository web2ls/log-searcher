import { useState } from 'react'
import './toolbar.css'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
	onToTop: () => void
	onToBottom: () => void
	onToLineNumber: (lineNumber: number) => void
}

export function Toolbar(props: Props) {
	const { onToTop, onToBottom, onToLineNumber } = props

	const [lineNumber, setLineNumber] = useState<number>(0)

	const handleToLineNumber = () => {
		onToLineNumber(lineNumber)
	}

	return (
		<div className='toolbar'>
			<Button variant='outline' onClick={onToTop}>
				To the top
			</Button>
			<Button variant='outline' onClick={onToBottom}>
				To the bottom
			</Button>
			<div className='line-number-input'>
				<Input
					type='number'
					placeholder='Line number'
					value={lineNumber}
					onChange={(event) => setLineNumber(Number(event.target.value))}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							handleToLineNumber()
						}
					}}
				/>
				<Button variant='outline' onClick={handleToLineNumber}>
					To line number
				</Button>
			</div>
		</div>
	)
}
