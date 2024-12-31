import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/LoginPage/Login';
import PostLoginPage from './pages/PostLoginPage/PostLoginPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import Workspace from './pages/WorkspacePage/Workspace';
import Dashboard from './pages/WorkspacePage/Response/Dashboard';
import PublishForm from './pages/PublishForm/PublishForm';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div style={{ backgroundColor: isDarkMode ? '#000' : 'white', color: isDarkMode ? 'white' : 'black', minHeight: '100vh' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/signup' element={<Login />}></Route>
          <Route path='/postlogin/:userId' element={<PostLoginPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}></Route>
          <Route path='/settings/:userId' element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}></Route>
          <Route path='/workspace' element={<Workspace isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}></Route>
          <Route path='/response' element={<Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}></Route>
          <Route path='/publishForm' element={<PublishForm />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;