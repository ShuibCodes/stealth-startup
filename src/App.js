import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CodepenApp from './components/CodepenApp';
import NewProjectApp from './components/NewProjectApp';
import './App.css';

const NavBar = () => (
  <nav className="nav-bar">
    <Link to="/">Codepen</Link>
    <Link to="/new-project">New Project</Link>
  </nav>
);

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CodepenApp />} />
        <Route path="/new-project" element={<NewProjectApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;