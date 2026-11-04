import type { Draft, HistoryItem } from '../types'
import { MY_PHONE } from '../data'
import { tenge } from '../lib/format'
import { TopBar } from '../components/TopBar'

type Props = { item: HistoryItem; index: number; onBack: () => void; onHome: () => void; onRepeat: (d: Draft) => void }

const titles: Record<HistoryItem['kind'], string> = {
  p2p: 'Перевод',
  qr: 'Оплата по QR',
  incoming: 'Входящий перевод',
  topup: 'Пополнение',
}

export function Receipt({ item, index, onBack, onHome, onRepeat }: Props) {
  const incoming = item.kind === 'incoming'
  const repeatDraft: Draft | null =
    item.kind === 'p2p'
      ? { kind: 'p2p', to: item.party, amount: item.amount, comment: item.comment ?? '' }
      : item.kind === 'topup'
        ? { kind: 'topup', phone: MY_PHONE, amount: item.amount }
        : null

  return (
    <div className="screen">
      <TopBar title="Квитанция" onBack={onBack} />
      <div className="scroll">
        <div className="total">
          <div className="hint">{titles[item.kind]}</div>
          <div className={`total__sum num${incoming ? ' plus' : ''}`}>
            {incoming ? '+' : '−'}
            {tenge(item.amount)}
          </div>
          <div className="hint ok">Успешно</div>
        </div>
        <div className="sheet">
          <div className="kv">
            <span>{incoming ? 'Отправитель' : 'Получатель'}</span>
            <span>{item.party.name}</span>
          </div>
          {item.party.phone && (
            <div className="kv">
              <span>Телефон</span>
              <span className="num">{item.party.phone}</span>
            </div>
          )}
          <div className="kv">
            <span>Дата</span>
            <span>{item.date}</span>
          </div>
          {item.comment && (
            <div className="kv">
              <span>Комментарий</span>
              <span>{item.comment}</span>
            </div>
          )}
          <div className="kv">
            <span>Комиссия</span>
            <span>0 ₸</span>
          </div>
          <div className="kv">
            <span>№ квитанции</span>
            <span className="num">TL-{70412 + index * 37}</span>
          </div>
        </div>
      </div>
      <div className="bottom bottom--split">
        {repeatDraft && (
          <button className="btn" onClick={() => onRepeat(repeatDraft)}>
            Повторить
          </button>
        )}
        <button className="btn btn--ghost" onClick={onHome}>
          На главную
        </button>
      </div>
    </div>
  )
}
