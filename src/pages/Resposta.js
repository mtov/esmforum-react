import React from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';

import { useParams } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

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
      .then(data => update(resposta));
}

function NovaResposta(props) {
    const [texto, setTexto] = React.useState('');
    
    function handleChange (event) {
      setTexto(event.target.value);
    }
  
    function handleClick(event) {
      postResposta(props.id, texto, props.update);
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

  function Resposta () {
    const [pergunta, setPergunta] = React.useState ('');
    const [listaRespostas, setListaRespostas] = React.useState([])

    let { id } = useParams(); 

    function adicionarNovaResposta(texto) {
      setListaRespostas((prev) => {
          const novaResposta = {
            id_resposta: prev.length + 1,
            texto: texto,
         };
        return [...prev, novaResposta];
      });
    }

    function TabelaRespostas() {   

      function LinhaTabela({ resposta }) {
        return (
          <tr>
            <td>{resposta.texto}</td>
          </tr>
        );
      }
    
      function TabelaPrincipal() {
        const linhas = listaRespostas.map(res => ( <LinhaTabela resposta={res} key={res.id_resposta} /> ));  
        return (
          <div className="container">
            <center><h6>Respostas</h6></center>
            <Table striped bordered>
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
        </div> 
      );
    }  

    function update(data) {
      setPergunta(data.pergunta.texto);
      setListaRespostas(data.respostas);
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/respostas/' + id)
        .then(response => response.json())
        .then(data => update(data));
    }, []);

    return (
      <div className="container">
        <h6> Pergunta {id} </h6>
        <p> {pergunta} </p>
        <TabelaRespostas />
        <NovaResposta id= {id} update={adicionarNovaResposta}/>
      </div>
    );
}
  
export default Resposta;