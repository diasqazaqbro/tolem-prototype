import { initials } from '../lib/format'

type Props = { name: string; color: string; size?: number }

export function Avatar({ name, color, size = 52 }: Props) {
  return (
    <div className="ava" style={{ background: color, width: size, height: size, fontSize: size * 0.33 }}>
      {initials(name)}
    </div>
  )
}
