import type { LogEntry } from '@/mock/generateLogs'
import { memo, useImperativeHandle, type RefObject } from 'react'
import { List, useListRef, type RowComponentProps } from 'react-window'
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

	const listRef = useListRef(null)

	useImperativeHandle(
		apiRef,
		() => ({
			scrollToTop: () => {
				listRef.current?.scrollToRow({ index: 0, behavior: 'smooth' })
			},
			scrollToBottom: () => {
				listRef.current?.scrollToRow({ index: items.length - 1, behavior: 'smooth' })
			},
			scrollToLineNumber: (index: number) => {
				listRef.current?.scrollToRow({ index, behavior: 'smooth' })
			}
		}),
		[listRef, items.length]
	)

	return (
		<section className='log-viewer-terminal'>
			<List
				rowComponent={(props) => <LogItem {...props} />}
				rowCount={items.length}
				rowHeight={39}
				rowProps={{ data: items }}
				listRef={listRef}
			/>
		</section>
	)
}

type LogItemRowProps = {
	data: LogEntry[]
}

type LogItemProps = RowComponentProps & LogItemRowProps

function LogItemComponent(props: LogItemProps) {
	const { index, style, data } = props
	const item = data[index]

	return (
		<div style={style}>
			{item.timestamp} {item.level} {item.source} | {item.message}
		</div>
	)
}

const LogItem = memo(LogItemComponent)
