import React from 'react';
import { Link } from "react-router-dom";
import { Container, Table, Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function postPergunta(pergunta, update) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pergunta: pergunta })
  };
  fetch('http://localhost:5000/perguntas', request)
    .then(response => response.json())
    .then(data => update(data.id_pergunta, pergunta));
}

function NovaPergunta(props) {
  const [texto, setTexto] = React.useState('');
  
  function handleChange (event) {
    setTexto(event.target.value);
  }

  function handleClick(event) {
    postPergunta(texto, props.update);
    setTexto('');
  }

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label> Faça a sua pergunta: </Form.Label>
          <Form.Control as="textarea" value={texto} onChange={handleChange}/>
        </Form.Group>
        <Button onClick={handleClick}>Enviar</Button>
      </Form>
    </Container>
  );
}

function Home() {
  const [listaPerguntas, setListaPerguntas] = React.useState([]);

  function adicionarNovaPergunta(id, texto) {
    setListaPerguntas((prev) => {
        const novaPergunta = {
          id_pergunta: id,
          texto: texto,
          num_respostas: 0,
        };
      return [...prev, novaPergunta];
    });
  }

  function TabelaPerguntas() {   

    function LinhaTabela({ pergunta }) {
      return (
        <tr>
          <td>{pergunta.id_pergunta}</td>
          <td>{pergunta.texto}</td>
          <td><Link to = {`/resposta/${pergunta.id_pergunta}`}>{pergunta.num_respostas}</Link></td>
        </tr>
      );
    }

    function TabelaPrincipal() {
      const linhas = listaPerguntas.map(p => ( <LinhaTabela pergunta={p} key={p.id} /> ));  
      return (
        <div className="container">
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
        <TabelaPrincipal />
        <NovaPergunta update={adicionarNovaPergunta}/>
      </div> 
    );
  }
    
  React.useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.json())
    .then((data) => setListaPerguntas(data));
  }, []);
    
  return (
    <div className="container"> 
      <TabelaPerguntas />
    </div>
  );
}

export default Home;