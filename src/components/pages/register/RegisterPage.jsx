import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthService from "../../../api/auth";
import { Navigate } from "react-router-dom";
import style from './RegisterPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuth, setIsAuth] = useState(null);
  const [isAuthInProgress, setIsAuthInProgress] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  //registration

  const isValidEmail = email => (/\S+@\S+\.\S+/.test(email))
  const sendLogAndPass = (login, password) => {
    if (!isValidEmail(email)) return setErrorEmail('Неверный адрес почты!'); 

    setIsAuthInProgress(true);
    AuthService.login(login, password)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log("login error", err);
      })
      .finally (() => {
        setIsAuthInProgress(false);
      });
  }


  
  if (isAuth) return <Navigate to="/messages" />;
  return (
    <Row className="justify-content-md-center" >
      <Col xs={7}>
        <Form>
          {
            isAuthInProgress === false
            ? <h3>Неверный пароль или логин</h3>
            : null
          }
          <h1>Создание менеджера</h1>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            {
              errorEmail !== null ? <p className={style.error}>{errorEmail}</p> : <p></p>
            }
            <Form.Control type="email" placeholder="" value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="login">
            <Form.Label>Логин</Form.Label>
            <Form.Control type="text" placeholder="" value={login} onChange={e => {setLogin(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" autoComplete="on" placeholder="" value={password} onChange={e => {setPassword(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Повторите пароль</Form.Label>
            <Form.Control className={password !== confirmPassword? style.err : null} type="password" autoComplete="on" placeholder="" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
          </Form.Group>
          <Button variant="primary" onClick={() => sendLogAndPass(login, password)}>Войти</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}
