import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Toolbar } from '../toolbar'

describe('Toolbar', () => {
	const onTop = vi.fn()
	const onBottom = vi.fn()
	const onLineNumber = vi.fn()

	it('should render', () => {
		render(<Toolbar onToTop={onTop} onToBottom={onBottom} onToLineNumber={onLineNumber} />)

		expect(screen.getByRole('button', { name: 'To the top' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'To the bottom' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'To line number' })).toBeInTheDocument()
		expect(screen.getByPlaceholderText('Line number')).toBeInTheDocument()
	})

	it('should call onToTop when To the top button is clicked', () => {
		render(<Toolbar onToTop={onTop} onToBottom={onBottom} onToLineNumber={onLineNumber} />)
		fireEvent.click(screen.getByRole('button', { name: 'To the top' }))
		expect(onTop).toHaveBeenCalled()
	})

	it('should call onToBottom when To the bottom button is clicked', () => {
		render(<Toolbar onToTop={onTop} onToBottom={onBottom} onToLineNumber={onLineNumber} />)
		fireEvent.click(screen.getByRole('button', { name: 'To the bottom' }))
		expect(onBottom).toHaveBeenCalled()
	})

	it('should call onToLineNumber when To line number button is clicked', () => {
		render(<Toolbar onToTop={onTop} onToBottom={onBottom} onToLineNumber={onLineNumber} />)
		const input = screen.getByPlaceholderText('Line number') as HTMLInputElement
		fireEvent.change(input, { target: { value: '10' } })
		fireEvent.click(screen.getByRole('button', { name: 'To line number' }))
		expect(onLineNumber).toHaveBeenCalledWith(10)
	})

	it('should not call onToLineNumber when Enter key is pressed and the input is empty', () => {
		render(<Toolbar onToTop={onTop} onToBottom={onBottom} onToLineNumber={onLineNumber} />)
		const input = screen.getByPlaceholderText('Line number') as HTMLInputElement
		fireEvent.change(input, { target: { value: '10' } })
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(onLineNumber).toHaveBeenCalledWith(10)
	})
})
