//src/components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Pet Planner</h1>
      </header>

      <main className="layout-main">
        {/* Punto de inserción para las rutas hijas */}
        <Outlet />
      </main>

      <footer className="layout-footer">
        <p>© 2025 Pet Planner by anaSposito</p>
      </footer>
    </div>
  );
};

export default MainLayout;

