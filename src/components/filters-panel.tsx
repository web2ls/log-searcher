import './filters-panel.css'
import type { Filters, UpdateFilterValue } from './log-viewer-page'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface Props {
	filters: Filters
	onUpdateFilterValue: UpdateFilterValue
	onResetFilters: () => void
}

export function FiltersPanel(props: Props) {
	const { filters, onUpdateFilterValue, onResetFilters } = props

	return (
		<section className='log-viewer-filters'>
			<h2>Filters</h2>
			<div className='filters-panel'>
				<div className='message-filter'>
					<Label htmlFor='search'>Search by message</Label>
					<Input
						id='search'
						type='text'
						placeholder='Search query'
						value={filters.message}
						onChange={(event) => onUpdateFilterValue('message', event.target.value)}
					/>
				</div>
				<div className='log-level-filters'>
					<div>
						<Label htmlFor='error'>Error</Label>
						<Checkbox
							id='error'
							checked={filters.level.ERROR}
							onCheckedChange={(checked) => {
								onUpdateFilterValue('level', {
									...filters.level,
									ERROR: Boolean(checked)
								})
							}}
						/>
					</div>
					<div>
						<Label htmlFor='warning'>Warning</Label>
						<Checkbox
							id='warning'
							checked={filters.level.WARN}
							onCheckedChange={(checked) =>
								onUpdateFilterValue('level', {
									...filters.level,
									WARN: Boolean(checked)
								})
							}
						/>
					</div>
					<div>
						<Label htmlFor='info'>Info</Label>
						<Checkbox
							id='info'
							checked={filters.level.INFO}
							onCheckedChange={(checked) =>
								onUpdateFilterValue('level', {
									...filters.level,
									INFO: Boolean(checked)
								})
							}
						/>
					</div>
				</div>

				<Button variant='outline' onClick={onResetFilters}>
					Reset
				</Button>
			</div>
		</section>
	)
}
