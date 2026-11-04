export type Person = {
  name: string
  short: string
  phone: string
  color: string
}

export type Party = { name: string; phone?: string; color: string }

export type OperationKind = 'p2p' | 'qr' | 'topup' | 'incoming'

export type HistoryItem = {
  id: string
  kind: OperationKind
  party: Party
  amount: number
  comment?: string
  date: string
}

/** Operation that is being prepared and waits for confirmation. */
export type Draft =
  | { kind: 'p2p'; to: Party; amount: number; comment: string }
  | { kind: 'qr'; to: Party; amount: number }
  | { kind: 'topup'; phone: string; amount: number }

export type Route =
  | { name: 'home' }
  | { name: 'transfer' }
  | { name: 'amount'; to: Person }
  | { name: 'topup' }
  | { name: 'qr' }
  | { name: 'history' }
  | { name: 'receipt'; id: string }
  | { name: 'confirm'; draft: Draft }
  | { name: 'success'; draft: Draft; receiptNo: string }
