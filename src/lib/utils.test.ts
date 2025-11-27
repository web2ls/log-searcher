import { generateLogs, type LogEntry } from '@/mock/generateLogs'
import { expect, test } from 'vitest'
import { filterLogs } from './utils'

test('filterLogs should return all logs if no filters are applied', () => {
	const logs = generateLogs(5)
	const filters = {
		message: '',
		level: {
			INFO: false,
			WARN: false,
			ERROR: false
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toEqual(logs)
})

test('filterLogs should return logs which match the message filter', () => {
	const logs: LogEntry[] = [
		{
			id: 1,
			timestamp: '2021-01-01',
			level: 'INFO',
			source: 'test',
			message: 'test message 1'
		},
		{
			id: 2,
			timestamp: '2021-01-01',
			level: 'WARN',
			source: 'test',
			message: 'warning message 2'
		},
		{
			id: 3,
			timestamp: '2021-01-01',
			level: 'ERROR',
			source: 'test',
			message: 'error message 3'
		}
	]

	const filters = {
		message: 'test',
		level: {
			INFO: false,
			WARN: false,
			ERROR: false
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toHaveLength(1)
	expect(result[0].message).toContain('test')
})

test('filterLogs should return logs which match the level filter', () => {
	const logs: LogEntry[] = [
		{
			id: 1,
			timestamp: '2021-01-01',
			level: 'INFO',
			source: 'test',
			message: 'test message 1'
		},
		{
			id: 2,
			timestamp: '2021-01-01',
			level: 'WARN',
			source: 'test',
			message: 'warning message 2'
		},
		{
			id: 3,
			timestamp: '2021-01-01',
			level: 'ERROR',
			source: 'test',
			message: 'error message 3'
		}
	]

	const filters = {
		message: '',
		level: {
			INFO: true,
			WARN: false,
			ERROR: false
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toHaveLength(1)
	expect(result[0].level).toBe('INFO')
})

test('filterLogs should return logs which match the message and level filters', () => {
	const logs: LogEntry[] = [
		{
			id: 1,
			timestamp: '2021-01-01',
			level: 'INFO',
			source: 'test',
			message: 'test message 1'
		},
		{
			id: 2,
			timestamp: '2021-01-01',
			level: 'WARN',
			source: 'test',
			message: 'warning message 2'
		},
		{
			id: 3,
			timestamp: '2021-01-01',
			level: 'ERROR',
			source: 'test',
			message: 'error message 3'
		},
		{
			id: 4,
			timestamp: '2021-01-01',
			level: 'INFO',
			source: 'test',
			message: 'strange message 4'
		}
	]

	const filters = {
		message: 'test',
		level: {
			INFO: true,
			WARN: false,
			ERROR: false
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toHaveLength(1)
	expect(result[0].message).toContain('test')
	expect(result[0].level).toBe('INFO')
})

test('filterLogs should return empty array if no logs match the filters', () => {
	const logs: LogEntry[] = [
		{
			id: 1,
			timestamp: '2021-01-01',
			level: 'ERROR',
			source: 'test',
			message: 'error message 1'
		}
	]

	const filters = {
		message: 'test',
		level: {
			INFO: false,
			WARN: false,
			ERROR: true
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toHaveLength(0)
})

test('filterLogs should return logs which match multiple levels filters', () => {
	const logs: LogEntry[] = [
		{
			id: 1,
			timestamp: '2021-01-01',
			level: 'INFO',
			source: 'test',
			message: 'test message 1'
		},
		{
			id: 2,
			timestamp: '2021-01-01',
			level: 'WARN',
			source: 'test',
			message: 'warning message 2'
		},
		{
			id: 3,
			timestamp: '2021-01-01',
			level: 'ERROR',
			source: 'test',
			message: 'error message 3'
		}
	]

	const filters = {
		message: '',
		level: {
			INFO: true,
			WARN: true,
			ERROR: true
		}
	}

	const result = filterLogs(logs, filters)
	expect(result).toHaveLength(3)
	expect(result[0].level).toBe('INFO')
	expect(result[1].level).toBe('WARN')
	expect(result[2].level).toBe('ERROR')
})
