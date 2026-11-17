import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Public Game Details
import Games from './pages/Games';
import GameQuiz from './pages/GameQuiz';
import GameDebug from './pages/GameDebug';
import GameAi from './pages/GameAi';
import Leaderboard from './pages/Leaderboard';
import Rules from './pages/Rules';
import About from './pages/About';

// Player Area
import PlayerDashboard from './pages/PlayerDashboard';
import PlayerQuiz from './pages/PlayerQuiz';
import PlayerDebug from './pages/PlayerDebug';
import PlayerAi from './pages/PlayerAi';
import StudentLogin from './pages/StudentLogin';

// OOPS in C++ Assessment Suite
import OopsHub from './pages/OopsHub';
import OopsQuiz from './pages/OopsQuiz';
import OopsPuzzle from './pages/OopsPuzzle';

// Layout Wrappers
import MobileOnly from './components/MobileOnly';
import DesktopOnly from './components/DesktopOnly';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Event Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/quiz" element={<GameQuiz />} />
        <Route path="/games/debug" element={<GameDebug />} />
        <Route path="/games/ai" element={<GameAi />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/about" element={<About />} />

        {/* OOPS in C++ Assessment, Quiz, Puzzle & Marks Routes */}
        <Route path="/oops" element={<OopsHub />} />
        <Route path="/oops/quiz" element={<OopsQuiz />} />
        <Route path="/oops/puzzle" element={<OopsPuzzle />} />
        <Route path="/quiz" element={<OopsQuiz />} />
        <Route path="/puzzle" element={<OopsPuzzle />} />

        {/* Dedicated Registration Route (Mobile Only) */}
        <Route path="/register/:registrationToken" element={
          <MobileOnly>
            <Register />
          </MobileOnly>
        } />
        
        <Route path="/login" element={
          <MobileOnly>
            <StudentLogin />
          </MobileOnly>
        } />
        
        {/* Player Dashboard Routes (Mobile Only) */}
        <Route path="/player/:playerToken" element={
          <MobileOnly>
            <PlayerDashboard />
          </MobileOnly>
        } />
        <Route path="/player/:playerToken/quiz" element={
          <MobileOnly>
            <PlayerQuiz />
          </MobileOnly>
        } />
        <Route path="/player/:playerToken/debug" element={
          <MobileOnly>
            <PlayerDebug />
          </MobileOnly>
        } />
        <Route path="/player/:playerToken/ai" element={
          <MobileOnly>
            <PlayerAi />
          </MobileOnly>
        } />

        {/* Admin Dashboard Routes (Desktop Only) */}
        <Route path="/admin/*" element={
          <DesktopOnly>
            <Admin />
          </DesktopOnly>
        } />
      </Routes>
    </Router>
  );
}

export default App;
