import { useEffect, useState } from 'react'
import { Prototype } from './Prototype'
import { Recorder } from './recorder/Recorder'

const isRecorder = () => window.location.hash === '#recorder'

export function App() {
  const [recorder, setRecorder] = useState(isRecorder)

  useEffect(() => {
    const onHash = () => setRecorder(isRecorder())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-recorder', recorder)
  }, [recorder])

  if (recorder) return <Recorder />

  return <Prototype />
}
