import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { ConnectionState } from './ConnectionState';
import { MessageForm } from './MessageForm/MessageForm';
import { Events } from './Events';
import { io } from 'socket.io-client';

//! https://www.oneclickitsolution.com/blog/socket-io-in-reactjs/
export const  Messages = ({token}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    console.log(token);
    const socketInstance = io('http://localhost:4000',{
      query: {token},
    });
    
    setSocket(socketInstance);
  
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(value) {
      setMessages(messages => [...messages, value]);
    }

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);
    socketInstance.on('message', onMessage);

    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.off('message', onMessage);
    };
  }, []);

  return (
    <>
      <p>Подключен: { '' + isConnected }</p>;
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