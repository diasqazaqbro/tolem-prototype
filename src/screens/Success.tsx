import type { Draft } from '../types'
import { tenge } from '../lib/format'

type Props = { draft: Draft; receiptNo: string; onHome: () => void }

export function Success({ draft, receiptNo, onHome }: Props) {
  return (
    <div className="screen">
      <div className="scroll">
        <div className="done">✓</div>
        <div className="total total--tight">
          <div className="hint">Готово</div>
          <div className="total__sum num">{tenge(draft.amount)}</div>
          <div className="hint">{draft.kind === 'topup' ? draft.phone : draft.to.name}</div>
        </div>
        <div className="sheet">
          <div className="kv">
            <span>Статус</span>
            <span className="ok">Успешно</span>
          </div>
          <div className="kv">
            <span>Комиссия</span>
            <span>0 ₸</span>
          </div>
          <div className="kv">
            <span>№ квитанции</span>
            <span className="num">{receiptNo}</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button className="btn" onClick={onHome}>
          На главную
        </button>
      </div>
    </div>
  )
}
