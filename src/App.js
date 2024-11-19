import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Playground from './screens/Playground';
import Error404 from './screens/Error404';
import { GlobalStyle } from './style/global';
import ModalProvider from './context/ModalContext';
import PlaygroundProvider from './context/PlaygroundContext';
import TopQuestionsPage from './components/TopQuestionsPage/TopQuestionsPage';
import LeetCodeDashboard from './components/LeetCodeDashboard';
// Import the authentication components
// import Login from './auth/login';
// import Register from './auth/register';

const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
          <GlobalStyle />
          <div className="App">
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="dashboard-button"
            >
              {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
            </button>
            {showDashboard && <LeetCodeDashboard />}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/playground/:folderId/:playgroundId"
              element={<Playground />}
            />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
            <Route path="/top-coding-questions" element={<TopQuestionsPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
  );
};

export default App;
