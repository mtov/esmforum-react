import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './pages/Menu.js'
import Pergunta from './pages/Pergunta.js';
import Resposta from './pages/Resposta.js';
import Sobre from './pages/Sobre.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<Pergunta />} />
            <Route path="resposta/:id_pergunta" element={<Resposta />} />
            <Route path="sobre" element={<Sobre />} />
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

