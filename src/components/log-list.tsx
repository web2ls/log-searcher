import type { LogEntry } from '@/mock/generateLogs'
import { type RefObject } from 'react'
import './log-list.css'

interface Props {
	items: LogEntry[]
	firstItemRef: RefObject<HTMLDivElement | null>
	lastItemRef: RefObject<HTMLDivElement | null>
}

export function LogList(props: Props) {
	const { items, firstItemRef, lastItemRef } = props

	return (
		<section className='log-viewer-terminal'>
			{items.map((item, index) => (
				<div
					key={item.id}
					id={`log-${index + 1}`}
					ref={index === 0 ? firstItemRef : index === items.length - 1 ? lastItemRef : undefined}
				>
					{item.timestamp} {item.level} {item.source} | {item.message}
				</div>
			))}
		</section>
	)
}
