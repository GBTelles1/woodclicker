import { MinigameContextProvider } from './contexts/MinigameContext';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Home } from './pages/Home';

function App() {
  return (
    <MinigameContextProvider>
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </MinigameContextProvider>
  )
}

export default App
