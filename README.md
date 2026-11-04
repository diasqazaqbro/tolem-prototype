# Tölem prototype

Clickable prototype of **Tölem**, a mobile payment app for young users in Kazakhstan (P2P transfers, QR payments, phone top-up, receipts). It was built for the pilot usability experiment in Practical Work 7 (IITU, research methods course), where the time to finish typical payment tasks is compared between the existing app (Condition A) and this prototype (Condition B).

All people, phone numbers and amounts in the app are fictional. Nothing is sent anywhere; the state lives in memory and resets on reload.

## Screens

| Flow | Path |
| --- | --- |
| Transfer to a recent contact | Home → avatar → amount → confirmation |
| Transfer to a phone contact with comment | Home → «Перевести» → contact → amount + comment → confirmation |
| Phone top-up | Home → «Пополнить телефон» → amount chip → confirmation |
| Repeat a transfer | Home → «История» → transfer → «Повторить» → confirmation |
| Receipt | Home → «История» → transfer |
| QR payment (simulated scan) | Home → «Оплата QR» → «Симулировать сканирование» → confirmation |

## Pilot recorder

Open the app with `#recorder` at the end of the URL (for example `http://localhost:5173/#recorder`) on a laptop. It is a stopwatch with the planned order of trials (S1–S5, A/B alternating). Space starts and stops the timer; results are kept in `localStorage` and can be copied as TSV.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + production build to dist/
```

Stack: React 19, TypeScript, Vite.

## Structure

```
src/
  Prototype.tsx      navigation stack and app state
  screens/           one component per screen
  components/        shared UI (avatar, icons, rows)
  recorder/          stopwatch for the pilot experiment
  data.ts            fictional contacts and history
```
