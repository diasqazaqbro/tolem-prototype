export const tenge = (n: number) => `${n.toLocaleString('ru-RU').replace(/ |,/g, ' ')} ₸`

export const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

export const receiptNumber = () => `TL-70${Math.floor(Math.random() * 900 + 100)}`
