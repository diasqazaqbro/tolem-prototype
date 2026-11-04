import { Icon, type IconName } from './Icon'

export type Section = 'home' | 'transfer' | 'qr' | 'topup' | 'history'

const items: Array<{ id: Section; icon: IconName; label: string }> = [
  { id: 'home', icon: 'home', label: 'Главная' },
  { id: 'transfer', icon: 'send', label: 'Перевести' },
  { id: 'qr', icon: 'qr', label: 'Оплата QR' },
  { id: 'topup', icon: 'phone', label: 'Пополнить телефон' },
  { id: 'history', icon: 'list', label: 'История' },
]

type Props = { active: Section; onNavigate: (s: Section) => void }

export function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <div className="brand sidebar__brand">
        Tö<b>lem</b>
      </div>
      <nav className="sidebar__nav">
        {items.map((it) => (
          <button
            key={it.id}
            className={`navlink${active === it.id ? ' navlink--on' : ''}`}
            aria-current={active === it.id ? 'page' : undefined}
            onClick={() => onNavigate(it.id)}
          >
            <Icon name={it.icon} />
            {it.label}
          </button>
        ))}
      </nav>
      <div className="sidebar__foot">
        <div className="sidebar__user">
          <div className="me">ДА</div>
          <div>
            <div className="sidebar__name">Дияс А.</div>
            <div className="sidebar__sub">Карта •• 4821</div>
          </div>
        </div>
        <a className="sidebar__rec" href="#recorder">
          Регистратор замеров →
        </a>
      </div>
    </aside>
  )
}
