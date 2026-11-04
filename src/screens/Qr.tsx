import { merchant } from '../data'
import type { Draft } from '../types'
import { TopBar } from '../components/TopBar'

type Props = { onBack: () => void; onScanned: (d: Draft) => void }

export function Qr({ onBack, onScanned }: Props) {
  return (
    <div className="screen cam">
      <TopBar title="Оплата по QR" onBack={onBack} dark />
      <div className="cam__body">
        <div className="frame" aria-hidden="true" />
        <div className="cam__hint">Наведите камеру на QR-код продавца</div>
        <button className="btn btn--amber" onClick={() => onScanned({ kind: 'qr', to: merchant, amount: 2500 })}>
          Симулировать сканирование
        </button>
      </div>
    </div>
  )
}
