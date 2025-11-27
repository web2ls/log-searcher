import type { Filters } from '@/components/log-viewer-page'
import type { LogEntry, LogLevel } from '@/mock/generateLogs'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function filterLogs(logs: LogEntry[], filters: Filters) {
	const filterMessage = filters.message.trim().toLowerCase()
	const isMessageFilterActive = filterMessage.length > 0

	const activeLevels = Object.keys(filters.level)
		.filter((key) => filters.level[key as LogLevel])
		.map((key) => key as LogLevel)

	const isLevelActive = activeLevels.length > 0

	if (!isLevelActive && !isMessageFilterActive) {
		return logs
	}

	return logs.filter((log) => {
		if (isLevelActive && !activeLevels.includes(log.level)) {
			return false
		}

		if (isMessageFilterActive && !log.message.toLowerCase().includes(filterMessage)) {
			return false
		}

		return true
	})
}
