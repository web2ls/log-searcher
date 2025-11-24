import './log-list.css'

const mockLines = [
	'[10:15:42.123] INFO  worker-1  | Загружаем батч логов...',
	'[10:15:42.456] DEBUG worker-1  | Сдвиг смещений: +500 строк',
	'[10:15:43.001] WARN  worker-3  | Пропущены строки: 2 (фильтр severity)',
	'[10:15:43.205] INFO  worker-1  | Отрисовка виртуального списка',
	'[10:15:44.098] ERROR worker-5  | Ошибка парсинга JSON в строке 1289',
	'[10:15:44.256] INFO  worker-5  | Повторная попытка парсинга успешна'
]

export function LogList() {
	return (
		<section className='log-viewer-terminal'>
			{mockLines.map((line) => (
				<span key={line}>{line}</span>
			))}
		</section>
	)
}
