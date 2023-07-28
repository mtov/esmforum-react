import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Sobre () {
  return (
    <div className="container">

      <br></br>
      <p> O <b>ESM Forum</b> é um sistema de demonstração do 
          livro <a href="https://engsoftmoderna.info/">Engenharia de Software 
          Moderna</a>.</p> 
    
      <p> Basicamente, o sistema é um fórum muito simples de perguntas e respostas.</p>

      <p> Seu objetivo é completamente didático e, por isso:</p> 
      <ul>
          <li>Ele é um sistema minimalista em termos de funcionalidades.</li>
          <li>Ele possui uma interface com o usuário muito simples.</li>
          <li>Ele usa um conjunto mínimo de tecnologias, tanto no frontend como no backend.</li>
      </ul>

      <p> Para mais informações, consulte o <a href="https://github.com/mtov/esmforum">repositório</a> GitHub do projeto.</p>
    </div>
  );

}
  
export default Sobre;