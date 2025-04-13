import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import MTOView from './pages/MTOView';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingState } from './components/common/LoadingState';
import { SacredSigil } from './components/common/SacredSigil';
import { RitualFooter } from './components/common/RitualFooter';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/" element={<MTOView />} />
              </Routes>
            </main>
          </div>
          <SacredSigil />
          <RitualFooter />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
