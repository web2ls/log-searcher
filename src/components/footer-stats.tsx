import './footer-stats.css'

interface Props {
	visibleLines: number
	totalLines: number
}

export function FooterStats(props: Props) {
	const { visibleLines, totalLines } = props

	return (
		<footer className='log-viewer-footer'>
			Visible lines: {visibleLines} / {totalLines}
		</footer>
	)
}
