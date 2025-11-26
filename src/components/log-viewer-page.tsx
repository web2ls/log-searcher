import { filterLogs } from '@/lib/utils'
import { generateLogs, type LogEntry } from '@/mock/generateLogs'
import debounce from 'lodash.debounce'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FiltersPanel } from './filters-panel'
import { FooterStats } from './footer-stats'
import { Header } from './header'
import { LogList, type LogListAPI } from './log-list'
import './log-viewer-page.css'
import { Toolbar } from './toolbar'

export interface Filters {
	message: string
	level: {
		INFO: boolean
		WARN: boolean
		ERROR: boolean
	}
}

// keyof Filters
// K extends keyof Filters -> Filters[K]

const DEFAULT_FILTERS: Filters = {
	message: '',
	level: {
		INFO: false,
		WARN: false,
		ERROR: false
	}
}

export type UpdateFilterValue = <K extends keyof Filters>(key: K, value: Filters[K]) => void

export function LogViewerPage() {
	const [logs] = useState<LogEntry[]>(() => generateLogs(100000))
	const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([])
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
	const LogListAPIRef = useRef<LogListAPI>(null)

	const filterLogsFn = () => {
		const newFilteredLogs = filterLogs(logs, filters)
		setFilteredLogs(newFilteredLogs)
	}

	const filterLogsFnRef = useRef<() => void>(filterLogsFn)

	useEffect(() => {
		filterLogsFnRef.current = filterLogsFn
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [logs, filters])

	const debouncedFilterLogs = useMemo(() => {
		const func = () => {
			console.log('debounced function is called')
			filterLogsFnRef.current?.()
		}
		return debounce(func, 500)
	}, [])

	useEffect(() => {
		debouncedFilterLogs()
	}, [logs, filters, debouncedFilterLogs])

	const handleUpdateFilters = <K extends keyof Filters>(key: K, value: Filters[K]) => {
		setFilters((prev) => {
			const newFilters = { ...prev }
			newFilters[key] = value
			return newFilters
		})
	}

	const handleResetFilters = () => {
		setFilters(DEFAULT_FILTERS)
	}

	const handleScrollToTop = () => {
		LogListAPIRef.current?.scrollToTop()
	}

	const handleScrollToBottom = () => {
		LogListAPIRef.current?.scrollToBottom()
	}

	const handleScrollToIndex = (lineNumber: number) => {
		const index = lineNumber - 1
		if (index < 0 || index >= filteredLogs.length) {
			return
		}

		LogListAPIRef.current?.scrollToLineNumber(index)
	}

	return (
		<div className='log-viewer-page'>
			<Header />
			<FiltersPanel
				filters={filters}
				onUpdateFilterValue={handleUpdateFilters}
				onResetFilters={handleResetFilters}
			/>
			<Toolbar
				onToTop={handleScrollToTop}
				onToBottom={handleScrollToBottom}
				onToLineNumber={handleScrollToIndex}
			/>
			<div className='log-viewer-content'>
				<LogList items={filteredLogs} apiRef={LogListAPIRef} />
			</div>
			<FooterStats visibleLines={filteredLogs.length} totalLines={logs.length} />
		</div>
	)
}
