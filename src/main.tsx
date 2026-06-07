import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

const showBootError = () => {
  document.body.classList.add('boot-error')
  const title = document.getElementById('boot-title')
  const message = document.getElementById('boot-message')
  if (title) title.textContent = '読み込みに失敗しました'
  if (message) message.textContent = '再読み込みで復旧しない場合は、演習セッションまたは保存データを初期化してください。'
}

window.addEventListener('error', (event) => {
  console.error('[AP Study] Global error:', event.error || event.message)
  showBootError()
})
window.addEventListener('unhandledrejection', (event) => {
  console.error('[AP Study] Unhandled rejection:', event.reason)
  showBootError()
})

function AppBootMarker() {
  React.useEffect(() => {
    document.body.classList.add('app-mounted')
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppBootMarker />
    </ErrorBoundary>
  </React.StrictMode>,
)
