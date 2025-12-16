import { generateLogs } from '@/mock/generateLogs'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LogList } from '../log-list'

describe('LogList', () => {
	const items = generateLogs(3)
	const apiRef = { current: null }

	it('should render', () => {
		render(<LogList items={items} apiRef={apiRef} />)

		const element1 = screen.getByText(items[0].message, { exact: false })
		const element2 = screen.getByText(items[2].message, { exact: false })
		expect(element1).toBeInTheDocument()
		expect(element2).toBeInTheDocument()
	})
})
