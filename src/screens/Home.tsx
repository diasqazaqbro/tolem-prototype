import { BALANCE, CARD, recent } from '../data'
import type { HistoryItem, Person } from '../types'
import { tenge } from '../lib/format'
import { Icon, type IconName } from '../components/Icon'
import { PeopleStrip } from '../components/PeopleStrip'
import { HistoryRow } from '../components/HistoryRow'

type Props = {
  history: HistoryItem[]
  onAction: (a: 'transfer' | 'qr' | 'topup' | 'history') => void
  onPick: (p: Person) => void
  onOpen: (id: string) => void
}

const actions: Array<{ id: 'transfer' | 'qr' | 'topup' | 'history'; icon: IconName; label: string }> = [
  { id: 'transfer', icon: 'send', label: 'Перевести' },
  { id: 'qr', icon: 'qr', label: 'Оплата QR' },
  { id: 'topup', icon: 'phone', label: 'Пополнить телефон' },
  { id: 'history', icon: 'list', label: 'История' },
]

export function Home({ history, onAction, onPick, onOpen }: Props) {
  return (
    <div className="screen screen--home">
      <div className="scroll">
        <div className="hello">
          <div className="brand">
            Tö<b>lem</b>
          </div>
          <div className="me">ДА</div>
        </div>
        <h1 className="page-title">Главная</h1>
        <div className="home-grid">
          <section className="home-main">
            <div className="balance">
              <small>Доступно</small>
              <div className="balance__sum num">{tenge(BALANCE)}</div>
              <div className="balance__card">{CARD}</div>
            </div>
            <div className="actions">
              {actions.map((a) => (
                <button key={a.id} className="act" onClick={() => onAction(a.id)}>
                  <i>
                    <Icon name={a.icon} />
                  </i>
                  {a.label}
                </button>
              ))}
            </div>
            <div className="sec">Недавние</div>
            <PeopleStrip people={recent} onPick={onPick} />
          </section>
          <section className="home-side">
            <div className="sec">Последние операции</div>
            <div className="list">
              {history.slice(0, 3).map((h) => (
                <HistoryRow key={h.id} item={h} onOpen={onOpen} />
              ))}
              {history.slice(3, 6).map((h) => (
                <div key={h.id} className="desktop-only">
                  <HistoryRow item={h} onOpen={onOpen} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
