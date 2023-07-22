import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

import  setings from '../../../setings';


export default function Messages(props) {
  console.log(props)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io.connect(`http://${setings.HOST}:${setings.SOCKET_PORT}/`, {
      query: {token}
    });
  })
  return (
    
    <Row>
      <Col xs={3}>
        <div>
          <div>Тест</div>
          <div>Онлайн</div>
        </div>
      </Col>
      
      <Col xs={9}>
        <div>Тестовое сообщение</div>
        <Form>
          <br/>
          <Form.Group className="mb-3" controlId="exampleForm.Messages">
            <Form.Control as="textarea" placeholder="Введите Ваше сообщение" />
          </Form.Group>
          <Button variant="primary">Отправить</Button>{' '}
        </Form>
      </Col>
    </Row>
  );
}