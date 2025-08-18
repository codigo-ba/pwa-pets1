import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './views/SplashScreen.jsx';
import WelcomeView from './views/WelcomeView.jsx';
import RegistrarMascota from './views/RegistrarMascota.jsx';
import ListadoMascotas from './views/ListadoMascotas.jsx';
import MainLayout from './components/MainLayout.jsx';
import './App.css'; // 🎨 Estilos globales
import AgendarActividad from './views/AgendarActividad.jsx';
import AgendarConsulta from './views/AgendarConsulta.jsx';
import AgendarVacuna from './views/AgendarVacuna.jsx';
import AgendarDesparasitacion from './views/AgendarDesparasitacion.jsx';
import AgendarOtra from './views/AgendarOtra.jsx';
import VerActividades from './views/VerActividades.jsx';


function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 5000); // ⏱️ Duración del splash en milisegundos

    return () => clearTimeout(timer); // 🧹 Limpieza del timer
  }, []);

  if (mostrarSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      {/* 🧱 Rutas anidadas dentro del layout principal */}
      <Route element={<MainLayout />}>
        <Route path="/bienvenida" element={<WelcomeView />} />
        <Route path="/registrar-mascota" element={<RegistrarMascota />} />
        <Route path="/ver-mascotas" element={<ListadoMascotas />} />
        <Route path="/agendar-actividad" element={<AgendarActividad />} />
        <Route path="/agendar-actividad/consulta" element={<AgendarConsulta />} />
        <Route path="/agendar-actividad/vacuna" element={<AgendarVacuna />} />
        <Route path="/agendar-actividad/desparasitacion" element={<AgendarDesparasitacion />} />
        <Route path="/agendar-actividad/otra" element={<AgendarOtra />} />
        <Route path="/ver-actividades" element={<VerActividades />} />
      </Route>

      {/* 🚪 Redirección desde raíz */}
      <Route path="/" element={<Navigate to="/bienvenida" />} />

      {/* ❓ Ruta no encontrada */}
      <Route
        path="*"
        element={
          <div className="ruta-no-encontrada">
            Ruta no encontrada.
          </div>
        }
      />
    </Routes>
  );
}

export default App;
