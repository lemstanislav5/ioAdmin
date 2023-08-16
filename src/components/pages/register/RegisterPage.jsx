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
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [registrationProgress, setIsRegistrationProgress] = useState(false);
  //registration

  const isValidEmail = email => (/\S+@\S+\.\S+/.test(email));
  const isValidLogin = login => (/^.*[a-zA-Z]+.*$/.test(login));
  const isValidPassword = password => (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(password));

  const sendRegisterData = () => {
    if (!isValidEmail(email)) {
      setErrorEmail('Неверный адрес почты!');
    } else {
      setErrorEmail(null);
    };
    if (!isValidPassword(password)){
      setErrorPassword('Пароль должен содержать не менее 6 знаков: 0-9, a-z, A-Z, !@#$%^&*!');
    } else {
      setErrorPassword(null);
    };
    if (confirmPassword !== password){
      setErrorConfirmPassword('Пароль пароли не соответствуют!');
    } else {
      setErrorConfirmPassword(null);
    };
    if (!errorEmail && !errorPassword && !errorConfirmPassword) {
      setIsRegistrationProgress(true);
      AuthService.registration(email, password)
        .then(res => {

        })
        .catch((err) => {
          console.log("login error", err);
        })
        .finally (() => {
          setIsRegistrationProgress(false);
        });
    }
  }
  const setDisabled = () => {
    //! ОШИБКИ УЧЕСТЬ
    if (email !== '' && password !== '' && confirmPassword !== '' && !registrationProgress) return false;
    return true;
  };
  console.log(email !== '' && password !== '' && confirmPassword !== '' && !registrationProgress)

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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль</Form.Label>
              {
                errorPassword !== null ? <p className={style.error}>{errorPassword}</p> : <p></p>
              }
              <Form.Control type="password" autoComplete="on" placeholder="" value={password} onChange={e => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Повторите пароль</Form.Label>
              {
                errorConfirmPassword !== null ? <p className={style.error}>{errorConfirmPassword}</p> : <p></p>
              }
              <Form.Control className={password !== confirmPassword? style.err : null} type="password" autoComplete="on" placeholder="" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" disabled={setDisabled()} onClick={() => sendRegisterData()}>Войти</Button>{' '}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
