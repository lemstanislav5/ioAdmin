import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthService from "../../../api/auth";
import { Navigate } from "react-router-dom";
import style from './RegisterPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [login, setLogin] = useState('');
  const [errorLogin, setErrorLogin] = useState(null);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuth, setIsAuth] = useState(null);
  //registration

  const isValidEmail = email => (/\S+@\S+\.\S+/.test(email));
  const isValidLogin = login => (/^.*[a-zA-Z]+.*$/.test(login));
  // !const isValidPassword = password => {
  //   const beginWithoutDigit = /^\D.*$/
  //   const withoutSpecialChars = /^[^-() /]*$/
  //   const containsLetters = /^.*[a-zA-Z]+.*$/
  //   if( beginWithoutDigit.test(password) &&
  //       withoutSpecialChars.test(password) &&
  //       containsLetters.test(password) ){
  //       return true;
  //   } 
  //   return false;
  // }

  const sendRegisterData = () => {
    console.log(isValidEmail(email), isValidLogin(login), isValidPassword(password))
    if (!isValidEmail(email)) setErrorEmail('Неверный адрес почты!'); 
    if (!isValidLogin(login)) setErrorLogin('Используйте латинские символы!'); 
    if (!isValidPassword(password)) setErrorPassword('Используйте латинские символы верхнего и нижнего регистров, спецсимолы!'); 
    console.log(errorEmail, errorEmail, errorPassword)

    // setIsAuthInProgress(true);
    // AuthService.login(login, password)
    //   .then(res => {
    //     localStorage.setItem("token", res.data.token);
    //     setIsAuth(true);
    //   })
    //   .catch((err) => {
    //     console.log("login error", err);
    //   })
    //   .finally (() => {
    //     setIsAuthInProgress(false);
    //   });
  }


  
  if (isAuth) return <Navigate to="/messages" />;
  return (
    <Container fluid> 
      <Row className="justify-content-md-center" >
        <Col xs={7}>
          <Form>
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
              {
                errorLogin !== null ? <p className={style.error}>{errorLogin}</p> : <p></p>
              }
              <Form.Control type="text" placeholder="" value={login} onChange={e => {setLogin(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль</Form.Label>
              {
                errorPassword !== null ? <p className={style.error}>{errorPassword}</p> : <p></p>
              }
              <Form.Control type="password" autoComplete="on" placeholder="" value={password} onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control className={password !== confirmPassword? style.err : null} type="password" autoComplete="on" placeholder="" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" onClick={() => sendRegisterData()}>Войти</Button>{' '}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
