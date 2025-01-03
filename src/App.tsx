import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './lib/firebase';
import { useGameStore } from './store/gameStore';
import { useLocaleStore } from './store/localeStore';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { TopicsPage } from './pages/admin/TopicsPage';
import { LessonsPage } from './pages/admin/LessonsPage';
import { StatsPage } from './pages/admin/StatsPage';
import { BattleArena } from './components/game/BattleArena';

function App() {
  const initializePlayer = useGameStore((state) => state.initializePlayer);
  const { locale, timestamp } = useLocaleStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        initializePlayer();
      }
    });

    return () => unsubscribe();
  }, [initializePlayer]);

  // Force re-render when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale, timestamp]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <BattleArena />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <BattleArena />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TopicsPage />} />
          <Route path="topics" element={<TopicsPage />} />
          <Route path="lessons" element={<LessonsPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;