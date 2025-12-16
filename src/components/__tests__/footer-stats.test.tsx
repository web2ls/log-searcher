import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FooterStats } from '../footer-stats'

describe('FooterStats', () => {
	const visibleLines = 100
	const totalLines = 1000

	it('should render', () => {
		render(<FooterStats visibleLines={visibleLines} totalLines={totalLines} />)
		expect(screen.getByText(`Visible lines: ${visibleLines} / ${totalLines}`)).toBeInTheDocument()
	})
})
