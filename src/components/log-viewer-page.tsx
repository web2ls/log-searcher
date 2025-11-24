import { generateLogs, type LogEntry } from '@/mock/generateLogs'
import { useState } from 'react'
import { FiltersPanel } from './filters-panel'
import { FooterStats } from './footer-stats'
import { Header } from './header'
import { LogList } from './log-list'
import './log-viewer-page.css'
import { Toolbar } from './toolbar'

export function LogViewerPage() {
	const [logs] = useState<LogEntry[]>(() => generateLogs(50))
	return (
		<div className='log-viewer-page'>
			<Header />
			<FiltersPanel />
			<Toolbar />
			<div className='log-viewer-content'>
				<LogList items={logs} />
			</div>
			<FooterStats />
		</div>
	)
}
