import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Form, Button } from 'react-bootstrap';

import Menu from './Menu.js'

function NovaPergunta(props) {

  const [enunciado, setEnunciado] = React.useState('');
  
  function handleChange (event) {
    setEnunciado(event.target.value);
  }

  function handleClick(event) {
    props.update(enunciado);
    setEnunciado('');
  }

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label> Faça a sua pergunta: </Form.Label>
          <Form.Control as="textarea" value={enunciado} onChange={handleChange}/>
        </Form.Group>
        <Button onClick={handleClick}>Enviar</Button>
      </Form>
    </Container>
  );
}

function TabelaPerguntas(props) {
  const [listaPerguntas, setListaPerguntas] = React.useState(props.perguntas);

  function adicionarNovaPergunta(enunciado) {
     setListaPerguntas((prev) => {
        const novaPergunta = {
           id: prev.length + 1,
           enunciado: enunciado,
           numRespostas: 0,
        };
      return [...prev, novaPergunta];
     });
  }

  function LinhaTabela({ pergunta }) {
    return (
      <tr>
        <td>{pergunta.id}</td>
        <td>{pergunta.enunciado}</td>
        <td>{pergunta.numRespostas}</td>
      </tr>
    );
  }

  function TabelaPrincipal() {
    const linhas = listaPerguntas.map(p => ( <LinhaTabela pergunta={p} key={p.id} /> ));  
    return (
      <div class="container">
        <center><h5>Peguntas Atuais</h5></center>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pergunta</th>
              <th># Respostas</th>
            </tr>
          </thead>
          <tbody>
            {linhas}
          </tbody>
        </Table>
      </div>
    );
  }
  
  return (
    <div>
      <TabelaPrincipal />;
      <NovaPergunta update={adicionarNovaPergunta}/>
    </div> 
  );
}

function App() {
  const perguntasIniciais = [
    { id: 1, enunciado: 'Quando é 2 + 2?', numRespostas: 3 },
    { id: 2, enunciado: 'Qual a capital de MG?', numRespostas: 1 },
  ];

  return (
    <div class="container">
      <Menu />
      <TabelaPerguntas perguntas={perguntasIniciais} />
    </div>
  );
}

export default App;