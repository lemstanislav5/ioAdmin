import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthStore from "../../../store/store";

export default function Signin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const sendLogAndPass = (login, password) => {
    AuthStore.login(login, password)
    .then(value => {
        console.log(value);
      }, reason => {
        console.log(reason);
    });
  }

  return (
    <Row className="justify-content-md-center" >
      <Col xs={3}>
        <Form>
          <br/>
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="*********" value={login} onChange={(e) => {setLogin(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" autoComplete="on" placeholder="*********" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" onClick={() => sendLogAndPass(login, password)}>Войти</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}