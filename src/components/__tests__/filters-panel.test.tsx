import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FiltersPanel } from '../filters-panel'
import type { Filters, UpdateFilterValue } from '../log-viewer-page'

const DEFAULT_FILTERS: Filters = {
	message: '',
	level: {
		INFO: false,
		WARN: true,
		ERROR: false
	}
}

describe('FiltersPanel', () => {
	let handleUpdateFilterValue: UpdateFilterValue
	let handleResetFilters: () => void

	beforeEach(() => {
		handleUpdateFilterValue = vi.fn()
		handleResetFilters = vi.fn()
	})

	it('should render', () => {
		render(
			<FiltersPanel
				filters={DEFAULT_FILTERS}
				onUpdateFilterValue={handleUpdateFilterValue}
				onResetFilters={handleResetFilters}
			/>
		)

		expect(screen.getByText('Filters')).toBeInTheDocument()

		expect(screen.getByPlaceholderText('Search query')).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Search query')).toHaveTextContent('')

		expect(screen.getByRole('checkbox', { name: 'Error' })).toBeInTheDocument()
		expect(screen.getByRole('checkbox', { name: 'Error' })).not.toBeChecked()

		expect(screen.getByRole('checkbox', { name: 'Warning' })).toBeInTheDocument()
		expect(screen.getByRole('checkbox', { name: 'Warning' })).toBeChecked()

		expect(screen.getByRole('checkbox', { name: 'Info' })).toBeInTheDocument()
		expect(screen.getByRole('checkbox', { name: 'Info' })).not.toBeChecked()

		expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Reset' })).toHaveTextContent('Reset')
	})

	it('should update filter value when input changes', async () => {
		render(
			<FiltersPanel
				filters={DEFAULT_FILTERS}
				onUpdateFilterValue={handleUpdateFilterValue}
				onResetFilters={handleResetFilters}
			/>
		)

		const input = screen.getByPlaceholderText('Search query') as HTMLInputElement
		fireEvent.change(input, { target: { value: 'test' } })
		expect(handleUpdateFilterValue).toHaveBeenCalledWith('message', 'test')
	})

	it('should reset filters when reset button is clicked', () => {
		render(
			<FiltersPanel
				filters={DEFAULT_FILTERS}
				onUpdateFilterValue={handleUpdateFilterValue}
				onResetFilters={handleResetFilters}
			/>
		)

		const resetButton = screen.getByRole('button', { name: 'Reset' })
		fireEvent.click(resetButton)
		expect(handleResetFilters).toHaveBeenCalled()
	})

	it('should update filter value when checkbox is changed', () => {
		render(
			<FiltersPanel
				filters={DEFAULT_FILTERS}
				onUpdateFilterValue={handleUpdateFilterValue}
				onResetFilters={handleResetFilters}
			/>
		)

		const errorCheckbox = screen.getByRole('checkbox', { name: 'Error' })
		fireEvent.click(errorCheckbox)
		expect(handleUpdateFilterValue).toHaveBeenCalledWith('level', { ...DEFAULT_FILTERS.level, ERROR: true })
	})
})
