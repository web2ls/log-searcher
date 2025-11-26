import { generateLogs, type LogEntry } from '@/mock/generateLogs'
import { useRef, useState } from 'react'
import { FiltersPanel } from './filters-panel'
import { FooterStats } from './footer-stats'
import { Header } from './header'
import { LogList } from './log-list'
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
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
	const firstItemRef = useRef<HTMLDivElement>(null)
	const lastItemRef = useRef<HTMLDivElement>(null)

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

	const getFilteredLogs = () => {
		return logs.filter((log) => {
			if (filters.message.trim() && !log.message.includes(filters.message)) {
				return false
			}

			const levels = filters.level
			const activeLevels = Object.entries(levels)
				.filter(([, value]) => value)
				.map(([key]) => key)

			if (activeLevels.length > 0 && !activeLevels.includes(log.level)) {
				return false
			}

			return true
		})
	}

	const handleToTop = () => {
		firstItemRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const handleToBottom = () => {
		lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	const handleToLineNumber = (lineNumber: number) => {
		if (lineNumber < 1 || lineNumber > logs.length) {
			return
		}

		const element = document.getElementById(`log-${lineNumber}`)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const filteredLogs = getFilteredLogs()

	return (
		<div className='log-viewer-page'>
			<Header />
			<FiltersPanel
				filters={filters}
				onUpdateFilterValue={handleUpdateFilters}
				onResetFilters={handleResetFilters}
			/>
			<Toolbar onToTop={handleToTop} onToBottom={handleToBottom} onToLineNumber={handleToLineNumber} />
			<div className='log-viewer-content'>
				<LogList items={filteredLogs} firstItemRef={firstItemRef} lastItemRef={lastItemRef} />
			</div>
			<FooterStats visibleLines={filteredLogs.length} totalLines={logs.length} />
		</div>
	)
}
