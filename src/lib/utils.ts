import type { Filters } from '@/components/log-viewer-page'
import type { LogEntry } from '@/mock/generateLogs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function filterLogs(logs: LogEntry[], filters: Filters) {
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
