import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Menu from './pages/Menu.js'
import Sobre from './pages/Sobre.js';
import Resposta from './pages/Resposta.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Home />} />
            <Route path="sobre" element={<Sobre />} />
            <Route path="resposta/:id" element={<Resposta />} />
          </Route>
      </Routes>
   </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <App />
  </React.StrictMode>
);

