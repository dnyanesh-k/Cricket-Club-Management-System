// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Layout from './components/Layout';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import MatchesPage from './pages/MatchesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import TeamManagement from './pages/TeamManagement';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/RegisterPage';
import PlayerManagement from './pages/PlayerManagement';
import MatchManagement from './pages/MatchManagement';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('token')
   

  };

  return (
    <div className="App">
      <Router>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
          
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard></AdminDashboard>  : <Navigate to="/" />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/admin/teams" element={<TeamManagement />} />
            <Route path="/admin/players" element={<PlayerManagement />} />
            <Route path="/admin/matches" element={<MatchManagement />} />

            <Route
              path="/profile"
              element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
           <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage  />}
            /> 
            {/* <Route path='/login' element={<LoginPage/>}/> */}
             <Route path="/register" element={<Register />} />

          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;