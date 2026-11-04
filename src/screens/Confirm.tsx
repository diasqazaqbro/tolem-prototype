import type { Draft } from '../types'
import { CARD } from '../data'
import { tenge } from '../lib/format'
import { TopBar } from '../components/TopBar'
import { Icon } from '../components/Icon'

type Props = { draft: Draft; onBack: () => void; onPay: () => void }

const labels: Record<Draft['kind'], string> = { p2p: 'Перевод', qr: 'Оплата по QR', topup: 'Пополнение телефона' }

export function Confirm({ draft, onBack, onPay }: Props) {
  return (
    <div className="screen">
      <TopBar title="Подтверждение" onBack={onBack} />
      <div className="scroll">
        <div className="total">
          <div className="hint">{labels[draft.kind]}</div>
          <div className="total__sum num">{tenge(draft.amount)}</div>
        </div>
        <div className="sheet">
          <div className="kv">
            <span>{draft.kind === 'qr' ? 'Продавец' : draft.kind === 'topup' ? 'Номер' : 'Получатель'}</span>
            <span>{draft.kind === 'topup' ? draft.phone : draft.to.name}</span>
          </div>
          {draft.kind === 'p2p' && draft.to.phone && (
            <div className="kv">
              <span>Телефон</span>
              <span className="num">{draft.to.phone}</span>
            </div>
          )}
          {draft.kind === 'p2p' && draft.comment && (
            <div className="kv">
              <span>Комментарий</span>
              <span>{draft.comment}</span>
            </div>
          )}
          <div className="kv">
            <span>Списать с</span>
            <span>{CARD}</span>
          </div>
          <div className="kv">
            <span>Комиссия</span>
            <span>0 ₸</span>
          </div>
        </div>
        <div className="secure">
          <Icon name="shield" />
          <div>Деньги спишутся только после подтверждения Face ID или PIN. Квитанция появится сразу после операции.</div>
        </div>
      </div>
      <div className="bottom">
        <button className="btn" onClick={onPay}>
          Подтвердить Face ID
        </button>
      </div>
    </div>
  )
}
