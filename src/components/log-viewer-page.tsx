import { filterLogs } from '@/lib/utils'
import { generateLogs, type LogEntry } from '@/mock/generateLogs'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
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

	const filterLogsFn = useCallback(() => {
		const result = filterLogs(logs, filters)
		setFilteredLogs(result)
	}, [filters, logs])

	const filterLogsFnRef = useRef(filterLogsFn)

	useEffect(() => {
		filterLogsFnRef.current = filterLogsFn
	}, [filterLogsFn])

	const debouncedFilterLogsFnRef = useRef<ReturnType<typeof debounce> | null>(null)

	useEffect(() => {
		debouncedFilterLogsFnRef.current = debounce(() => filterLogsFnRef.current?.(), 500)

		return () => {
			debouncedFilterLogsFnRef.current?.cancel()
		}
	}, [])

	useEffect(() => {
		debouncedFilterLogsFnRef.current?.()
	}, [filters, logs])

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
