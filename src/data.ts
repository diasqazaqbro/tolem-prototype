import type { HistoryItem, Person } from './types'

const palette = ['#0d6e6e', '#b45309', '#7c3aed', '#be185d', '#0369a1', '#4d7c0f', '#9a3412', '#475569', '#0f766e', '#a16207']

const raw: Array<[string, string, string]> = [
  ['Айдос Нурланов', 'Айдос', '+7 701 *** 42 18'],
  ['Мадина Каримова', 'Мадина', '+7 747 *** 09 55'],
  ['Ерлан Сапаров', 'Ерлан', '+7 777 *** 31 20'],
  ['Асель Жумабек', 'Асель', '+7 705 *** 64 07'],
  ['Бауыржан Омаров', 'Бауыржан', '+7 702 *** 18 93'],
  ['Дана Ахметова', 'Дана', '+7 771 *** 50 11'],
  ['Жанибек Тулеген', 'Жанибек', '+7 708 *** 77 34'],
  ['Камила Серик', 'Камила', '+7 776 *** 02 48'],
  ['Нурсултан Абаев', 'Нурсултан', '+7 700 *** 85 62'],
  ['Томирис Ермек', 'Томирис', '+7 747 *** 39 70'],
]

export const people: Person[] = raw.map(([name, short, phone], i) => ({ name, short, phone, color: palette[i] }))

export const recent = people.slice(0, 5)

export const MY_PHONE = '+7 707 512 38 64'
export const BALANCE = 184_250
export const CARD = 'Карта •• 4821'

export const merchant = { name: 'Coffee Boom, Абая 52', color: palette[7] }
const topupParty = { name: 'Пополнение телефона', color: palette[4] }

export const initialHistory: HistoryItem[] = [
  { id: 'h1', kind: 'p2p', party: people[0], amount: 3000, comment: 'за такси', date: 'Сегодня, 09:14' },
  { id: 'h2', kind: 'qr', party: merchant, amount: 2350, date: 'Вчера, 18:40' },
  { id: 'h3', kind: 'incoming', party: people[1], amount: 2000, date: 'Вчера, 13:02' },
  { id: 'h4', kind: 'topup', party: topupParty, amount: 1000, date: '2 ноября, 21:15' },
]

export { topupParty }

export const kindLabel: Record<HistoryItem['kind'], string> = {
  p2p: 'Перевод',
  qr: 'Оплата по QR',
  incoming: 'Входящий перевод',
  topup: 'Мобильная связь',
}
