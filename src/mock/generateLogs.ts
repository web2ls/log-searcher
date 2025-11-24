import { getNouns, sentence } from 'txtgen'

export type LogLevel = 'INFO' | 'WARN' | 'ERROR'

export interface LogEntry {
	id: number
	timestamp: string
	level: LogLevel
	source: string
	message: string
}

export function generateLogs(count: number): LogEntry[] {
	return Array.from({ length: count }, (_, index) => ({
		id: index + 1,
		timestamp: new Date().toISOString(),
		level: Math.random() <= 0.3 ? 'INFO' : Math.random() <= 0.6 ? 'WARN' : 'ERROR',
		source: getNouns()[0],
		message: sentence()
	}))
}
