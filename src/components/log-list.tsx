import type { LogEntry } from '@/mock/generateLogs'
import { useImperativeHandle, useRef, type RefObject } from 'react'
import './log-list.css'

export type LogListAPI = {
	scrollToTop: () => void
	scrollToBottom: () => void
	scrollToLineNumber: (lineNumber: number) => void
}

interface Props {
	items: LogEntry[]
	apiRef: RefObject<LogListAPI | null>
}

export function LogList(props: Props) {
	const { items, apiRef } = props

	const containerRef = useRef<HTMLDivElement>(null)

	useImperativeHandle(
		apiRef,
		() => ({
			scrollToTop: () => {
				containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
			},
			scrollToBottom: () => {
				containerRef.current?.scrollTo({ top: containerRef.current?.scrollHeight, behavior: 'smooth' })
			},
			scrollToLineNumber: (index: number) => {
				const element = document.getElementById(`log-${index}`)
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' })
				}
			}
		}),
		[]
	)

	return (
		<section className='log-viewer-terminal' ref={containerRef}>
			{items.map((item, index) => (
				<div
					key={item.id}
					id={`log-${index}`}
					// ref={index === 0 ? firstItemRef : index === items.length - 1 ? lastItemRef : undefined}
				>
					{item.timestamp} {item.level} {item.source} | {item.message}
				</div>
			))}
		</section>
	)
}
