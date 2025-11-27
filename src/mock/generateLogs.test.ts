import { expect, test } from 'vitest'
import { generateLogs } from './generateLogs'

test('generateLogs should generate logs with the correct number of logs', () => {
	const logs = generateLogs(5)
	expect(logs).toHaveLength(5)
})

test('generateLogs should generate correct type of logs', () => {
	const logs = generateLogs(10)
	expect(logs).toHaveLength(10)
	const log = logs[0]
	expect(log).toHaveProperty('id')
	expect(log).toHaveProperty('timestamp')
	expect(log).toHaveProperty('level')
	expect(log).toHaveProperty('source')
	expect(log).toHaveProperty('message')
	expect(log.id).toBeTypeOf('number')
	expect(log.timestamp).toBeTypeOf('string')
	expect(log.level).toBeOneOf(['INFO', 'WARN', 'ERROR'])
	expect(log.source).toBeTypeOf('string')
	expect(log.message).toBeTypeOf('string')
})
