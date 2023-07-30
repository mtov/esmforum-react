import React from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

function postResposta(id_pergunta, resposta, update) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      id_pergunta: id_pergunta,
      resposta: resposta 
    })
  };
  fetch('http://localhost:5000/respostas', request)
    .then(response => response.json())
    .then(data => update(data.id_resposta, resposta));
}

function NovaResposta(props) {
  const [texto, setTexto] = React.useState('');
  
  function handleChange (event) {
    setTexto(event.target.value);
  }

  function handleClick(event) {
    postResposta(props.id_pergunta, texto, props.update);
    setTexto('');
  }

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label> Dê a sua resposta: </Form.Label>
          <Form.Control as="textarea" value={texto} onChange={handleChange}/>
        </Form.Group>
        <Button onClick={handleClick}>Enviar</Button>
      </Form>
    </Container>
  );
}

function Resposta() {
  const [pergunta, setPergunta] = React.useState ('');
  const [listaRespostas, setListaRespostas] = React.useState([])

  let { id_pergunta } = useParams(); 

  function adicionarNovaResposta(id_resposta, resposta) {
    setListaRespostas((prev) => {
      const novaResposta = {
        id_resposta: id_resposta,
        texto: resposta
      };
      return [...prev, novaResposta];
    });
  }

  function TabelaRespostas() {   

    function LinhaTabela({ resposta }) {
      return (
        <tr><td> {resposta.texto} </td></tr>
      );
    }
  
    function TabelaPrincipal() {
      const linhas = listaRespostas.map(res => ( <LinhaTabela resposta={res} key={res.id_resposta} /> ));  
      return (
        <div className="container">
          <center><h6>Respostas</h6></center>
          <Table striped bordered>
            <tbody> {linhas} </tbody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <TabelaPrincipal />
      </div> 
    );
  }  

  React.useEffect(() => {
    fetch('http://localhost:5000/respostas/' + id_pergunta)
    .then(response => response.json())
    .then(data => {
       setPergunta(data.pergunta.texto);
       setListaRespostas(data.respostas);
    })
  }, []);

  function existeResposta() {
    return listaRespostas.length > 0;
  }

  return (
    <div>
      <div className="container">
        <h6> Pergunta {id_pergunta} </h6>
        <p> {pergunta} </p>
        { !existeResposta() && <p> Ainda não temos respostas para essa pergunta! </p> }
      </div>
      { existeResposta() && <TabelaRespostas/> }  
      <NovaResposta id_pergunta={id_pergunta} update={adicionarNovaResposta}/>
    </div>
  );
}
  
export default Resposta;