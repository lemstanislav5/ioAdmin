import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthService from "../../../api/api";
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(null);

  const sendLogAndPass = (login, password) => {
    AuthService.login(login, password)
      .then(res => {
        setAccess(true);
      })
      .catch((err) => {
        setAccess(false);
        console.log("login error", err);
      });
  }
  
  if (access) return <Navigate to="/messages" />;
  return (
    <Row className="justify-content-md-center" >
      <Col xs={4}>
        <Form>
          {
            access === false
            ? <><br/> <Alert variant="danger">Неправильный логин или пароль!</Alert></>
            : null
          }
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="*********" value={login} onChange={(e) => {setLogin(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" autoComplete="on" placeholder="*********" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" disabled={access} onClick={() => sendLogAndPass(login, password)}>Войти</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}
