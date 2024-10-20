import './App.css'
import './main.css'

import { Spinner } from 'keep-react'
import { UrlLoader } from './components/UrlLoader'
import { TopBar } from './components/TopBar'
import { $store } from './store'
import { RecentsGrid } from './components/RecentsGrid'

function App() {
  const state = $store.use()

  return (
    <main className="dark text-foreground bg-background">
      <TopBar />
      {state.isLoading && <Spinner color="info" size="lg" />}
      {!state.isLoading && <UrlLoader />}
      <RecentsGrid />
    </main>
  )
}

// <Avatar src="https://cdn.acidcow.com/pics/20181221/selfie_25.jpg" alt="nextui" radius="md" size="lg" />

export default App
