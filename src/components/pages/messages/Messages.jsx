import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

import { ConnectionState } from './ConnectionState';
import { MessageForm } from './MessageForm';
import { Events } from './Events';

import { io } from 'socket.io-client';
import  { setings } from '../../../setings';

const token = localStorage.getItem("token"),
      socket = io.connect(`http://${setings.HOST}:${setings.SOCKET_PORT}/`, {
          query: {token},
          autoConnect: false
          //autoConnect автоматическое соединение запрещено
      });

export const  Messages = (props) => {
  console.log(props);
  //isConnected состояние соединения
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    //connect() соединяемся с сервером, закрытие соединения socket.disconnect();
    socket.connect();
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessages(value) {
      setMessages(messages => [...messages, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('messages', onMessages);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('messages', onMessages);
    };

  }, []);

  return (
    <>
      <Row>
        <Events events={ messages } />
        <ConnectionState isConnected={ isConnected } />
      </Row>
      <Row>
        <MessageForm socket={socket}/>
      </Row>
    </>


    // <Row>
    //   <Col xs={3}>
    //     <div>
    //       <div>Тест</div>
    //       <div>Онлайн</div>
    //     </div>
    //   </Col>
      
    //   <Col xs={9}>
    //     <div>Тестовое сообщение</div>
    //     <Form>
    //       <br/>
    //       <Form.Group className="mb-3" controlId="exampleForm.Messages">
    //         <Form.Control as="textarea" placeholder="Введите Ваше сообщение" />
    //       </Form.Group>
    //       <Button variant="primary">Отправить</Button>{' '}
    //     </Form>
    //   </Col>
    // </Row>
  );
}