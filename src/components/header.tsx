import { Button } from '@/components/ui/button'
import './header.css'

export function Header() {
	return (
		<header className='log-viewer-header'>
			<h1>Log Searcher</h1>
			<Button variant='secondary' size='sm'>
				Параметры
			</Button>
		</header>
	)
}
